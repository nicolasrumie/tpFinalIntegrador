export const requireLogin = (req, res, next) => {
    // Un login exitoso crea una sesion -> comprobar si existe esa sesion
    // Si no existe sesion redirigimos a la pantalla de login
    if (!req.session.user) {
        return res.redirect("/index");
    }
    next();
}

export const loggerURL = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next();
};

export const validateProduct = (req, res, next) => {
    const {name, image, category, price } = req.body;

    if (!name || !image || !category || !price) {
        return res.status(400).json({
            message: "Faltan datos obligatorios"
        });
    }
    next();
};

export const requireAdmin = (req, res, next) => {
    if (!req.session.admin) {
        return res.redirect("/admin/login");
    }

    next();
};