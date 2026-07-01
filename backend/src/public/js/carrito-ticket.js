function productsView(){
    window.location.href = "/productos";
}

function downloadTicket() {
    const carrito = JSON.parse(sessionStorage.getItem("carrito"));

    const { jsPDF} = window.jspdf;
    const doc = new jsPDF();

    let y = 25;

    doc.setFontSize(24);

    doc.text("Mizuta | Ticket", 30, y);
    
    y+= 20;

    doc.setFontSize(12);

    carrito.forEach((producto, index) => {
        
        doc.text(`Producto: ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`, 40, y);
        y += 10;
    });

    const precioTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio) * parseInt(producto.cantidad), 0);
    y += 10;
    doc.setFontSize(18);
    doc.text(`Total: $${precioTotal}`, 30, y);
    let fecha = new Date();
    let nombreTicket = `pedido-${sessionStorage.getItem("username")}-${fecha.toISOString()}.pdf`;
    
    doc.save(nombreTicket);
}
window.addEventListener("DOMContentLoaded", () =>
{
    document.querySelector("#back-btn").addEventListener("click", productsView);
    document.querySelector("#ticket-btn").addEventListener("click", downloadTicket);
});