/////////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import { join } from "path";
import { __dirname } from './src/api/utils/index.js';
import viewRoutes from './src/api/routes/view.routes.js';
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";

const app = express();

/////////////////////
// Config
const PORT = environments.port;
const { port, session_key } = environments;
console.log("CONFIGURACION LEIDA:", environments);


/////////////////////
// Middlewares
app.use(cors()); // Middleware basico para permitir todas las solicitudes

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: session_key, 
    resave: false, 
    saveUninitialized: false,
    cookie: { 
        secure: false
    }
}));

app.set("views", join(__dirname, "src", "views", "pages"));
app.set("view engine", "ejs"); // Motor de vistas
app.use(express.static(join(__dirname, "src", "public")));

// Middleware logger para analizar todas las solicitudes por consola (tener el historial del consumo de nuestra Api REST en la consola)
app.use((req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next(); // next() da paso a que continue la respuesta o el siguiente middleware (en caso de haberlo)
});

// TO DO -> Middleware para parsear JSON en las solcitudes POST y PUT

function validateProduct(req, res, next) {
    const {name, image, category, price } = req.body;

    if (!name || !image || !category || !price) {
        return res.status(400).json({
            message: "Faltan datos obligatorios"
        });
    }
    next();
}


/////////////////////
// Endpoints
app.get("/", (req, res) => {
    res.send("Servidor corriendo");
});

app.get("/admin/login", (req, res) => {
    res.render("admin/login", {
        error: undefined
    });
});

// GET all products
app.get("/api/products", async (req, res) => {
    // const sql = "SELECT * FROM products";
    // aca traere la conexion para tirarle sentencias
    const [rows] = await connection.query("SELECT * FROM products");

    // console.log(rows);

    res.status(200).json({
        payload: rows
    });
});

// GET active products
app.get("/api/products/active", async (req, res) => {
    try {
        const sql = "SELECT * FROM products WHERE active = true";

        const [rows] = await connection.query(sql);

        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

// GET by id
app.get("/api/products/:id", async (req, res) => {

    const id = req.params.id; // Obtendo el valor que paso por la URL

    const [rows] = await connection.query("SELECT * FROM products where products.id = ?", [id]);

    // console.log(rows);

    res.status(200).json({
        payload: rows
    });
});

app.post("/api/products", validateProduct, async (req, res) => {
    try {
        console.log(req.body);

        const {name, image, category, price } = req.body;

        const sql = "INSERT INTO products (name, image, category, price) VALUES (?, ?, ?, ?)";

        const [rows] = await connection.query(sql, [name, image, category, price]);

        res.status(200).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

app.put("/api/products/:id", validateProduct, async (req, res) => {
    try {
        const id = req.params.id;

        console.log(req.body);

        const { name, image, category, price } = req.body;

        const sql = "UPDATE products SET name = ?, image = ?, category = ?, price = ? WHERE id = ?";

        const [rows] = await connection.query(sql, [name, image, category, price, id]);

        res.status(200).json({
            message: "Producto actualizado con exito",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

app.delete("/api/products/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const sql = "UPDATE products SET active = false WHERE id = ?";

        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            message: "Producto dado de baja",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del server"
        });
    }
});

// endpoint put para reactivar el producto
app.put("/api/products/:id/active", async (req, res) => {
    try {
        const id = req.params.id;

        const sql = "UPDATE products SET active = true WHERE id = ?";

        const [rows] = await connection.query(sql, [id]);

        res.status(200).json({
            message: "Producto dado de alta",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});


function requireAdmin(req, res, next) {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }

    next();
}


app.post("/api/admin", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Faltan datos obligatorios"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        const [rows] = await connection.query(sql, [name, email, hashedPassword]);

        res.status(201).json({
            message: "Usuario administrador creado con exito",
            userId: rows.insertId
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

app.post("/admin/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("admin/login", {
                error: "Faltan campos en el formulario"
            });
        }

        const sql = "SELECT * FROM users WHERE email = ?";

        const [rows] = await connection.query(sql, [email]);

        if (rows.length === 0) {
            return res.render("admin/login", {
                error: "No existe un administrador con ese email"
            });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render("admin/login", {
                error: "Contraseña incorrecta"
            });
        }

        req.session.admin = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        res.redirect("/admin/get");

    } catch (error) {
        console.log(error);

        res.render("admin/login", {
            error: "Error interno del servidor"
        });
    }
});

app.post("/admin/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            return res.redirect("/admin/get");
        }

        res.redirect("/admin/login");
    });
});

app.get("/admin/get", requireAdmin, (req, res) => {
    res.render("admin/get");
});

app.get("/admin/getById", requireAdmin, (req, res) => {
    res.render("admin/getById");
});

app.get("/admin/post", requireAdmin, (req, res) => {
    res.render("admin/post");
});

app.get("/admin/put", requireAdmin, (req, res) => {
    res.render("admin/put");
});

app.get("/admin/delete", requireAdmin, (req, res) => {
    res.render("admin/delete");
});

app.post('/index', (req, res) => {
    // 1. Extraemos 'nombre' y lo renombramos a 'name'
    const { nombre: name } = req.body; 

    // 2. Validaciones en el Servidor
    if (!name || name.trim() === "") {
        return res.status(400).json({ 
            message: "El nombre es obligatorio en el servidor." 
        });
    }

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetras.test(name)) {
        return res.status(400).json({ 
            message: "El nombre solo debe contener letras en el servidor." 
        });
    }

    // 3. Si todo está bien, guardamos la sesión y RESPONDEMOS al frontend
    req.session.user = { name: name.trim() };

    // ESTO ES LO QUE FALTABA: Avisarle al frontend que fue exitoso
    return res.status(200).json({
        message: "Login exitoso",
        redirectUrl: "/productos"
    });
});

app.use("/", viewRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
