import connection from "../database/db.js";

const insertVenta = (nombre_usuario, precio_total) => {
    const sql = "INSERT INTO ventas (nombre_usuario, precio_total, fecha) VALUES (?, ?, NOW())";
    return connection.query(sql, [nombre_usuario, precio_total]);
};

const insertDetalleVenta = (ventaId, productoId, cantidad) => {
    const sql = "INSERT INTO ventas_productos (id_venta, id_producto, cantidad) VALUES (?, ?, ?)";
    return connection.query(sql, [ventaId, productoId, cantidad]);
};

const obtenerIdPorNombre = (nombreProducto) => {
    const sql = "SELECT id FROM products WHERE name = ? LIMIT 1";
    return connection.query(sql, [nombreProducto]);
};

export default {
    insertVenta,
    insertDetalleVenta,
    obtenerIdPorNombre
};