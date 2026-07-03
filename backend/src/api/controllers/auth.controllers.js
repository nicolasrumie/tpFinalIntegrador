import bcrypt from 'bcrypt';
import AuthModels from '../models/auth.models.js';

export const loginAdminRender = async (req, res) => {
    res.render("admin/login", {
        title: "Admin | Login",
        estilos: [],
        error: undefined
    });
};

export const adminLogout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            return res.redirect("/admin/get");
        }

        res.redirect("/admin/login");
    });
};

export const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Faltan datos obligatorios"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [rows] = await AuthModels.insertAdmin({ 
            name, 
            email, 
            password: hashedPassword 
        });

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
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("admin/login", {
                title: "Admin | Login",
                estilos: [],
                error: "Faltan campos en el formulario"
            });
        }

        const [rows] = await AuthModels.selectAdminByEmail(email);

        if (rows.length === 0) {
            return res.render("admin/login", {
                title: "Admin | Login",
                estilos: [],
                error: "No existe un administrador con ese email"
            });
        }

        const user = rows[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.render("admin/login", {
                title: "Admin | Login",
                estilos: [],
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
            title: "Admin | Login",
            estilos: [],
            error: "Error interno del servidor"
        });
    }
};
