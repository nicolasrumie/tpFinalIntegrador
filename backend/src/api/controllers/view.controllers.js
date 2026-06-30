import { join, __dirname } from "../utils/index.js";


export const indexView = async (req, res) => {
        res.render("index", {
            title: "Mizuta",
            estilos: [] 
        });
};

export const cartView = async (req, res) => {
    res.render("carrito", {
        title: "Carrito",
        about: "🛒 Tu carrito",
        estilos: ["/css/styles-carrito.css"]
    })
}

export const prodView = async (req, res) => {
    res.render("productos", {
        title: "Productos",
        estilos: ["/css/styles-productos.css"]
    })
}