const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorForm = document.getElementById("contenedor-form");
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
    const htmlProducto = `
        <div class="admin-product-card-single">
            <img class="admin-product-img" src="${producto.image}" alt="${producto.name}">

            <div class="admin-product-info">
                <h3>${producto.name}</h3>
                <p><strong>ID:</strong> ${producto.id}</p>
                <p><strong>Categoria:</strong> ${producto.category}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Activo:</strong> ${producto.active}</p>
            </div>

            <div>
                <button id="updateProduct-button" class="admin-action-button">
                    Modificar este producto
                </button>
            </div>
        </div>
    `;

    contenedorProductos.innerHTML = htmlProducto;
    contenedorForm.innerHTML = "";
    mensaje.innerHTML = "";

    const updateProductButton = document.getElementById("updateProduct-button");

    updateProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Queres modificar este producto?");

        if (!confirmacion) {
            alert("Modificacion cancelada");
        } else {
            formularioPutProducto(producto);
        }
    });
}

function formularioPutProducto(producto) {
    const htmlForm = `
        <hr>

        <form id="updateProduct-form" class="admin-form">

            <input type="hidden" name="id" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" class="admin-input" value="${producto.name}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" class="admin-input" value="${producto.image}" required>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" class="admin-input" required>
                <option value="videojuegos" ${producto.category === "videojuegos" ? "selected" : ""}>Videojuegos</option>
                <option value="accesorios" ${producto.category === "accesorios" ? "selected" : ""}>Accesorios</option>
            </select>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" class="admin-input" value="${producto.price}" required>

            <div>
                <input type="submit" value="Actualizar producto" class="admin-action-button">
            </div>
        </form>
    `;

    contenedorForm.innerHTML = htmlForm;

    const updateProductForm = document.getElementById("updateProduct-form");

    updateProductForm.addEventListener("submit", actualizarProducto);
}

async function actualizarProducto(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    console.log(data);

    try {
        const response = await fetch(`${urlBase}/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const parsedResponse = await response.json();

        console.log(parsedResponse);

        mensaje.innerHTML = `
            <p>${parsedResponse.message}</p>
        `;

        contenedorProductos.innerHTML = "";
        contenedorForm.innerHTML = "";
        getProductForm.reset();

    } catch (error) {
        console.log(error);

        mensaje.innerHTML = `
            <p>Error al actualizar el producto</p>
        `;
    }
}

function mostrarError(mensajeError) {
    contenedorProductos.innerHTML = `
        <p class="mensaje-error">${mensajeError}</p>
    `;

    contenedorForm.innerHTML = "";
    mensaje.innerHTML = "";
}