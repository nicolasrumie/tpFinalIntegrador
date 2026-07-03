function obtenerCarrito() 
{
    const carritoString = sessionStorage.getItem("carrito");
    return JSON.parse(carritoString) || [];
}

function cargarProductosCarrito() 
{
    let tabla = document.querySelector(".table");
    let montoFinal = document.getElementById("valor-final");
    let carrito = obtenerCarrito();
    let totalAcumulado = 0;

    carrito.forEach(producto => {

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

        filaParaAgregar.appendChild(casillaNombre);
        filaParaAgregar.appendChild(casillaCantidad);
        filaParaAgregar.appendChild(casillaPrecio);

        tabla.appendChild(filaParaAgregar);

        totalAcumulado += producto.precio * producto.cantidad;

    });

    montoFinal.innerText = `Total: $${totalAcumulado.toFixed(2)}`;
    
}

function limpiarCarrito() 
{
    sessionStorage.removeItem("carrito");
    
    cargarProductosCarrito();

    window.location.reload();
}

function productsView(){
    window.location.href = "/productos";
}
function indexView(){
    window.location.href = "/index";
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
    document.querySelector(".btn-seguir-comprando").addEventListener("click", productsView);
    document.querySelector(".navbar-name-logo").addEventListener("click", indexView);
    
    const botonComprar = document.querySelector('.btn-comprar');

    if (botonComprar) {
        botonComprar.addEventListener('click', async () => {
            
            // 1. Traer el carrito desde el sessionStorage
            const carritoMap = JSON.parse(sessionStorage.getItem('carrito')) || [];

            // 1b. Mapear mandando el NOMBRE del juego en la propiedad 'name'
            const productosMapeados = carritoMap.map(producto => {
                return {
                    name: producto.nombre,
                    cantidad: producto.cantidad || 1
                };
            });

            // Armar el objeto final
            const datosCompra = {
                nombre_usuario: sessionStorage.getItem('username'),
                precio_total: document.getElementById('valor-final').innerText.replace('Total: $', ''),
                productos: productosMapeados 
            };


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