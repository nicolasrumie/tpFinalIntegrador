export const adminGetView = async (req, res) => {
    res.render("admin/get", {
        title: "Admin | Ver productos",
        adminTitle: "GET | Ver todos los productos",
        estilos: []
    });
};

export const adminGetByIdView = async (req, res) => {
    res.render("admin/getById", {
        title: "Admin | Consultar producto",
        adminTitle: "GET | Consultar producto por ID",
        estilos: []
    });
};

export const adminPostView = async (req, res) => {
    res.render("admin/post", {
        title: "Admin | Crear producto",
        adminTitle: "POST | Crear producto",
        estilos: []
    });
};

export const adminPutView = async (req, res) => {
    res.render("admin/put", {
        title: "Admin | Modificar producto",
        adminTitle: "PUT | Modificar producto",
        estilos: []
    });
};

export const adminDeleteView = async (req, res) => {
    res.render("admin/delete", {
        title: "Admin | Baja y alta lógica",
        adminTitle: "DELETE | Baja y alta lógica",
        estilos: []
    });
};