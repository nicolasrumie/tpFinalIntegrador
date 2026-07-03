const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const mensaje = document.getElementById("mensaje");

const urlBase = "http://localhost:3001/api/products";

getProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Ingresa un ID valido");
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${idProd}`);

        const datos = await response.json();

        console.log(datos);

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        const producto = datos.payload[0];

        if (!producto) {
            mostrarError("No se encontro ningun producto con ese ID");
            return;
        }

        renderizarProducto(producto);

    } catch (error) {
        console.log(error);

        mostrarError("Error de conexion con el servidor");
    }
});

function renderizarProducto(producto) {
    let textoEstado = "";

    if (producto.active == 1) {
        textoEstado = "Activo";
    } else {
        textoEstado = "Inactivo";
    }

    const htmlProducto = `
        <div class="admin-product-card-single">
            <img class="admin-product-img" src="${producto.image}" alt="${producto.name}">

            <div class="admin-product-info">
                <h3>${producto.name}</h3>
                <p><strong>ID:</strong> ${producto.id}</p>
                <p><strong>Categoria:</strong> ${producto.category}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Estado:</strong> ${textoEstado}</p>
            </div>

            <div>
                <button id="deleteProduct-button" class="admin-action-button">
                    Dar de baja
                </button>

                <button id="activeProduct-button" class="admin-action-button">
                    Activar producto
                </button>
            </div>
        </div>
    `;

    contenedorProductos.innerHTML = htmlProducto;
    mensaje.innerHTML = "";

    const deleteProductButton = document.getElementById("deleteProduct-button");
    const activeProductButton = document.getElementById("activeProduct-button");

    deleteProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Queres dar de baja este producto?");

        if (!confirmacion) {
            alert("Baja cancelada");
        } else {
            darDeBajaProducto(producto.id);
        }
    });

    activeProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Queres activar este producto?");

        if (!confirmacion) {
            alert("Activacion cancelada");
        } else {
            activarProducto(producto.id);
        }
    });
}

async function darDeBajaProducto(id) {
    try {
        const response = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        });

        const parsedResponse = await response.json();

        console.log(parsedResponse);

        mensaje.innerHTML = `
            <p>${parsedResponse.message}</p>
        `;

        getProductForm.reset();
        contenedorProductos.innerHTML = "";

    } catch (error) {
        console.log(error);

        mensaje.innerHTML = `
            <p>Error al dar de baja el producto</p>
        `;
    }
}

async function activarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/${id}/active`, {
            method: "PUT"
        });

        const parsedResponse = await response.json();

        console.log(parsedResponse);

        mensaje.innerHTML = `
            <p>${parsedResponse.message}</p>
        `;

        getProductForm.reset();
        contenedorProductos.innerHTML = "";

    } catch (error) {
        console.log(error);

        mensaje.innerHTML = `
            <p>Error al activar el producto</p>
        `;
    }
}

function mostrarError(mensajeError) {
    contenedorProductos.innerHTML = `
        <p class="mensaje-error">${mensajeError}</p>
    `;

    mensaje.innerHTML = "";
}