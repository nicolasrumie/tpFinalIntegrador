export const validateClient = (req, res, next) => {
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

    req.session.user = { name: name.trim() };

    return res.status(200).json({
        message: "Login exitoso",
        redirectUrl: "/productos"
    });
}