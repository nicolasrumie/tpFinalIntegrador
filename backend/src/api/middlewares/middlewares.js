export const requireLogin = (req, res, next) => {

    // Un login exitoso crea una sesion -> comprobar si existe esa sesion

    // Si no existe sesion redirigimos a la pantalla de login
    if (!req.session.user) {
        return res.redirect("/index");
    }

    next();
}
