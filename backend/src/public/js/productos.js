const listadoProductos = document.getElementById("listado-productos");
const botonesCategoria = document.querySelectorAll(".category-button");

const url = "http://localhost:3001/api/products/active";

let productosGlobales = [];
let categoriaActual = "todos";

async function obtenerProductos() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const parsedResponse = await response.json();
            throw new Error(parsedResponse.message);
        }

        const { payload } = await response.json();

        productosGlobales = payload;

        filtrarPorCategoria();

    } catch (error) {
        console.error(error);
        mostrarError(error.message);
    }
}

function filtrarPorCategoria() {
    let productosFiltrados = productosGlobales;

    if (categoriaActual !== "todos") {
        productosFiltrados = productosGlobales.filter(producto => {
            return producto.category.toLowerCase() === categoriaActual;
        });
    }

    renderizarProductos(productosFiltrados);
}

function renderizarProductos(productos) {
    if (productos.length === 0) {
        listadoProductos.innerHTML = `
            <p class="mensaje-error">No hay productos en esta categoria.</p>`;
        return;
    }

    let htmlProductos = "";
    
    productos.forEach(producto => {
        htmlProductos += `
            <article class="product-card">
                <div class="product-image-area">
                    <img src="${producto.image}" alt="${producto.name}">
                </div>

                <div class="product-info">
                    <span class="product-badge">${producto.category}</span>
                    <h3 class="nombre-producto">${producto.name}</h3>
                    
                    <div class="product-bottom">
                        <strong class="precio-producto">$${producto.price}</strong>

                        <div class="add-less-buttons">
                            <button class="btn-sumar-a-carrito"> + </button>
                            <button class="btn-restar-a-carrito"> - </button>
                        </div>
                    </div>
                </div>
            </article>`;
    });

    listadoProductos.innerHTML = htmlProductos;
}

function mostrarError(mensaje) {
    listadoProductos.innerHTML = `
        <p class="mensaje-error">${mensaje}</p>`;
}

function configurarBotonesCategoria() {
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesCategoria.forEach(btn => {
                btn.classList.remove("active");
            });

            boton.classList.add("active");

            categoriaActual = boton.dataset.category;

            filtrarPorCategoria();
        });
    });
}

function obtenerCarrito() 
{
    const carritoString = sessionStorage.getItem("carrito");
    
    // 1. Si ni siquiera existe o está totalmente vacío, devolvemos array vacío de una
    if (!carritoString || carritoString.trim() === "") {
        return [];
    }

    // 2. Si existe algo, intentamos parsearlo. Si está corrupto, el catch nos salva.
    try {
        return JSON.parse(carritoString);
    } catch (error) {
        console.warn("El LocalStorage estaba corrupto, y se reinició el carrito.");
        // Opcional: limpiamos el localStorage para que no vuelva a fallar
        sessionStorage.removeItem("carrito"); 
        return [];
    }
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    console.log(`Carrito actualizado: ${JSON.stringify(carrito)}`);
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarAlCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    const contenedorProducto = elementoClickeado.closest(".product-card");

    const nombre = contenedorProducto.querySelector(".nombre-producto").innerText;
    
    // Extraer el precio y convertirlo a número entero quitando el signo $
    const precioTexto = contenedorProducto.querySelector(".precio-producto").innerText;
    const precio = parseFloat(precioTexto.replace("$", ""));

    // Obtengo el carrito
    let carrito = obtenerCarrito();

    // Buscar si el producto si ya se encuentra en el carrito
    let productoExistente = carrito.find(prod => prod.nombre === nombre);

    if (productoExistente) {
        // Si esta suma 1
        productoExistente.cantidad += 1;
    } else {
        // Si no estaba agrega el producto al carrito con cantidad 1
        const nuevoProducto = {
            nombre: nombre,
            cantidad: 1,
            precio: precio
        };

        carrito.push(nuevoProducto);
    }

    // Guardar en LocalStorage y alertar al usuario
    guardarCarrito(carrito);
    alert(`Un/una: ${nombre} fue agregado al carrito.`);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    const contenedorProd = elementoClickeado.closest(".product-card");

    const nombre = contenedorProd.querySelector(".nombre-producto").innerText;

    let carrito = obtenerCarrito();

    // Validar que el carrito este vacio antes de intentar eliminar un producto, para evitar errores al intentar acceder a propiedades de objetos que no existen
    if (carrito.length === 0) {
        alert("No hay ningún producto guardado en el carrito.");
        return;
    }

    // Buscar si el producto existe en el carrito y obtener su indice para luego eliminarlo o decrementar su cantidad
    let indiceProd = carrito.findIndex(prod => prod.nombre === nombre);

    if (indiceProd === -1) {
        // Si no existía previamente en el listado
        alert(`No hay más ${nombre} en el carrito.`);
    } else {
        // Si existía previamente, se decrementa la cantidad en 1
        carrito[indiceProd].cantidad -= 1;

        // Si la cantidad llega a 0, se elimina del array para NO almacenar elementos en 0 y quitarlo del carrito
        if (carrito[indiceProd].cantidad === 0) {
            carrito.splice(indiceProd, 1);
        }

        // Guardar cambios en LocalStorage y alertar la eliminación exitosa
        guardarCarrito(carrito);
        alert(`Un/una: ${nombre} fue eliminado del carrito.`);
    }
}

function borrarCarrito()
{
    sessionStorage.removeItem("carrito");
    alert("Carrito vaciado exitosamente.");
}

function indexView(){
    window.location.href = "/index";
}

const nombreCliente = sessionStorage.getItem("username");

if (!nombreCliente) {
    // Si no hay nombre en el sessionStorage, lo mandamos directo al login
    window.location.href = "/index";
}

window.addEventListener("DOMContentLoaded", () => {
    // Leemos desde sessionStorage
    const clientName = sessionStorage.getItem("username");
    const nameContainer = document.getElementById("nombre-perfil");

    nameContainer.textContent = clientName ? clientName : "Invitado";

    document.querySelector(".navbar-name-logo").addEventListener("click", indexView);

    configurarBotonesCategoria();

    obtenerProductos();
});

listadoProductos.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("btn-sumar-a-carrito")) {
        sumarAlCarrito(e);
    }
    
    if (e.target.classList.contains("btn-restar-a-carrito")) {
        restarDelCarrito(e);
    }
});