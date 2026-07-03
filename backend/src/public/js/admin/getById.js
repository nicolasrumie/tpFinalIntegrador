const inputId = document.getElementById("input-id");
const btnBuscar = document.getElementById("btn-buscar");
const contenedorProducto = document.getElementById("contenedor-producto");

async function buscarProducto() {
    try {
        const id = inputId.value;
        const url = `http://localhost:3001/api/products/${id}`;
        
        const response = await fetch(url);

        const data = await response.json();
        console.log(data);

        mostrarProducto(data.payload);
    } catch (error) {
        console.log(error);
        contenedorProducto.innerHTML = `
            <p>Error al buscar el producto</p>`;
    }
}

function mostrarProducto(productos) {
    if (productos.length === 0) {
        contenedorProducto.innerHTML = `
            <p>No se encontro ningun producto con ese ID</p>`;
        return;
    }
    
    const producto = productos[0];

    let estado = "";

    if (producto.active == 1) {
        estado = "Activo";
    } else {
        estado = "Inactivo";
    }

    contenedorProducto.innerHTML = `
        <div class="admin-product-card">
            <img class="admin-product-img" src="${producto.image}" alt="${producto.name}">

            <div class="admin-product-info">
                <h3>${producto.name}</h3>
                <p><strong>ID:</strong> ${producto.id}</p>
                <p><strong>Categoria:</strong> ${producto.category}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <p><strong>Estado:</strong> ${estado}</p>
            </div>
        </div>`;
}

btnBuscar.addEventListener("click", buscarProducto);