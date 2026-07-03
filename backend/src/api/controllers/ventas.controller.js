import VentasModels from '../models/ventas.models.js';

export const crearVenta = async (req, res) => {
    // Desestructuramos lo que nos llegó del fetch
    const { nombre_usuario, precio_total, productos } = req.body;

    // Validación básica
    if (!productos || productos.length === 0) {
        return res.status(400).json({ message: "El carrito está vacío." });
    }

    try {
        const [rowsVenta] = await VentasModels.insertVenta(nombre_usuario, precio_total);
        const ventaId = rowsVenta.insertId;

        for (const prod of productos) {
            const [rowsProducto] = await VentasModels.obtenerIdPorNombre(prod.name);

            if (rowsProducto.length > 0) {
                const idProductoReal = rowsProducto[0].id;
                const cantidad = prod.cantidad || 1;

                await VentasModels.insertDetalleVenta(ventaId, idProductoReal, cantidad);
            } else {
                console.warn(`El producto "${prod.id_producto}" no se encontró en la base de datos.`);
            }
        }

        res.status(200).json({ 
            message: "Compra procesada y verificada con la base de datos con éxito.",
            ventaId: ventaId
        });

    } catch (error) {
        console.error("Error crítico al guardar la venta:", error);
        res.status(500).json({ message: "Error interno del servidor al procesar la compra." });
    }
};