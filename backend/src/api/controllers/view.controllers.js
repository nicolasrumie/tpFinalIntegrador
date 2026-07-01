import { join, __dirname } from "../utils/index.js";


export const indexView = async (req, res) => {
        res.render("index", {
            title: "Mizuta",
            estilos: [] 
        });
};

export const cartView = async (req, res) => {
    res.render("carrito", {
        title: "Mizuta |Carrito",
        about: "🛒 Tu carrito",
        estilos: ["/css/styles-carrito.css"]
    })
}

export const prodView = async (req, res) => {
    res.render("productos", {
        title: "Mizuta |Productos",
        estilos: ["/css/styles-productos.css"]
    })
}

export const ticketCartView = async (req, res) => {
    res.render("carrito-ticket", {
        title: "Mizuta | Ticket",
        estilos: ["/css/styles-carrito-ticket.css"]
    })
}