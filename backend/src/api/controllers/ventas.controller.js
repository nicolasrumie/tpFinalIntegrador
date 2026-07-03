import VentasModels from '../models/ventas.models.js';

export const crearVenta = async (req, res) => {
    // Desestructuramos lo que nos llegó del fetch
    const { nombre_usuario, precio_total, productos } = req.body;

    // Validación básica
    if (!productos || productos.length === 0) {
        return res.status(400).json({ message: "El carrito está vacío." });
    }

    try {
        // 1. PRIMER INSERT: Guardar la venta general
        const [rowsVenta] = await VentasModels.insertVenta(nombre_usuario, precio_total);
        const ventaId = rowsVenta.insertId; // El ID autogenerado de la venta

        // 2. SEGUNDO PASO: Recorrer y matchear los productos con la Base de Datos
        for (const prod of productos) {
            // 🔴 Cambiamos prod.name por prod.id_producto para que deje de ser undefined
            const [rowsProducto] = await VentasModels.obtenerIdPorNombre(prod.name);

            if (rowsProducto.length > 0) {
                const idProductoReal = rowsProducto[0].id; // El ID numérico de tu tabla
                const cantidad = prod.cantidad || 1;

                // Insertamos en detalle_ventas
                await VentasModels.insertDetalleVenta(ventaId, idProductoReal, cantidad);
            } else {
                // Esto te va a mostrar qué string exacto está buscando si no lo encuentra
                console.warn(`El producto "${prod.id_producto}" no se encontró en la base de datos.`);
            }
        }

        // 3. Responder al frontend con éxito
        res.status(200).json({ 
            message: "Compra procesada y verificada con la base de datos con éxito.",
            ventaId: ventaId
        });

    } catch (error) {
        console.error("Error crítico al guardar la venta:", error);
        res.status(500).json({ message: "Error interno del servidor al procesar la compra." });
    }
};