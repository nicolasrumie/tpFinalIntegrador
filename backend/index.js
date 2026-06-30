/////////////////////
// Importaciones
import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();

/////////////////////
// Config
const PORT = environments.port;
console.log("CONFIGURACION LEIDA:", environments);


/////////////////////
// Middlewares
app.use(cors()); // Middleware basico para permitir todas las solicitudes

app.use(express.json());

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
    res.send("Hola mundo");
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

        const sql = "UPDATE products SET ative = false WHERE id = ?";

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
            message: "Producta dado de alta",
            payload: rows
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
