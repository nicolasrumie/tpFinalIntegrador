function obtenerCarrito() 
{
    const carritoString = sessionStorage.getItem("carrito");
    return JSON.parse(carritoString) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.querySelector(".table");
    //Defino variable que va a mostrar el valor final a pagar al final de la cuenta
    let montoFinal = document.getElementById("valor-final");

    let carrito = obtenerCarrito();
    //Variable auxiliar como acumulador
    let totalAcumulado = 0;

    //Recorro el carrito para mostrar cada producto en la tabla
    carrito.forEach(producto => {
        // Crea las celdas (td) e inserta los valores correspondientes
        let filaParaAgregar = document.createElement("tr");
        filaParaAgregar.classList.add("table-header");

        let casillaNombre = document.createElement("td");
        casillaNombre.classList.add("product");
        casillaNombre.innerText = producto.nombre;

        let casillaCantidad = document.createElement("td");
        casillaCantidad.classList.add("product");
        casillaCantidad.innerText = `x${producto.cantidad}`;

        let casillaPrecio = document.createElement("td");
        casillaPrecio.classList.add("product");
        casillaPrecio.innerText = `$${producto.precio}`;

        // Añadir celdas a la fila
        filaParaAgregar.appendChild(casillaNombre);
        filaParaAgregar.appendChild(casillaCantidad);
        filaParaAgregar.appendChild(casillaPrecio);

        // Añadir la fila completa a la tabla
        tabla.appendChild(filaParaAgregar);

        // Calcular el subtotal considerando el precio unitario multiplicado por la cantidad elegida
        totalAcumulado += producto.precio * producto.cantidad;
    });

    // Actualizar el elemento del valor final en la vista con el total calculado
    montoFinal.innerText = `Total: $${totalAcumulado.toFixed(2)}`;
    
}

function limpiarCarrito() 
{
    // Limpia todo el LocalStorage
    sessionStorage.removeItem("carrito");
    
    // Recargar la tabla para que se actualice y muestre el carrito vacío
    cargarProductosCarrito();

    window.location.reload(); // Recarga la página para reflejar la limpieza del carrito.
}

function productsView(){
    window.location.href = "/productos";
}
function indexView(){
    window.location.href = "/index";
}
function ticketCartView(){
    window.location.href = "/carrito-tickets";
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
    document.querySelector(".btn-seguir-comprando").addEventListener("click", productsView);
    document.querySelector(".navbar-name-logo").addEventListener("click", indexView);
    document.querySelector(".btn-comprar").addEventListener("click", ticketCartView);
    const botonComprar = document.querySelector('.btn-comprar');

    if (botonComprar) {
        botonComprar.addEventListener('click', async () => {
            
            // 1. Traer el carrito desde el sessionStorage
            const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

            // 1b. Mapear mandando el NOMBRE del juego en la propiedad 'name'
            const productosMapeados = carrito.map(producto => {
                return {
                    name: producto.nombre,
                    cantidad: producto.cantidad || 1
                };
            });

            // Armar el objeto final
            const datosCompra = {
                nombre_usuario: sessionStorage.getItem('username'),
                precio_total: document.getElementById('valor-final').innerText.replace('Total: $', ''), // Extrae solo el número
                productos: productosMapeados 
            };

            console.log("=== DATOS QUE SALEN DEL FRONTEND ===");
            console.log(datosCompra);
            console.log(datosCompra.productos[0]);

            // 2. Envío al backend
            try {
                const response = await fetch('/api/ventas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datosCompra)
                });

                const resultado = await response.json();

                if (response.ok) {
                    // 3. Si todo salió bien, vaciamos el carrito y redirigimos
                    sessionStorage.removeItem('carrito');
                    window.location.href = '/carrito-tickets';
                } else {
                    alert("Hubo un error al procesar la compra: " + resultado.message);
                }
            } catch (error) {
                console.error("Error en la petición: ", error);
            }
        });
    }
});