//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    const carritoString = localStorage.getItem("carrito");
    
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
        localStorage.removeItem("carrito"); 
        return [];
    }
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
    console.log(`Carrito actualizado: ${JSON.stringify(carrito)}`);
    localStorage.setItem("carrito", JSON.stringify(carrito));
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

const contenedorTarjetas = document.getElementById("listado-productos");

// 2. Escuchamos el click
contenedorTarjetas.addEventListener("click", (e) => {
    // Si hace click en el botón de sumar (+)
    if (e.target.classList.contains("btn-sumar-a-carrito")) {
        sumarAlCarrito(e);
    }
    
    // Si hace click en el botón de restar (-)
    if (e.target.classList.contains("btn-restar-a-carrito")) {
        restarDelCarrito(e);
    }
});

function borrarCarrito()
{
    localStorage.removeItem("carrito");
    alert("Carrito vaciado exitosamente.");
}
