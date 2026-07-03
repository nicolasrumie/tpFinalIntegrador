const formCrearProducto = document.getElementById("form-crear-producto");

const inputName = document.getElementById("input-name");
const inputImage = document.getElementById("input-image");
const inputCategory = document.getElementById("input-category");
const inputPrice = document.getElementById("input-price");

const mensaje = document.getElementById("mensaje");

async function crearProducto(e) {
    e.preventDefault();

    const nuevoProducto = {
        name: inputName.value,
        image: inputImage.value,
        category: inputCategory.value,
        price: inputPrice.value
    };
    
    const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoProducto)
    });

    const data = await response.json();
    console.log(data);

    mensaje.innerHTML = `
        <p>${data.message}</p>`;

    formCrearProducto.reset();
}

formCrearProducto.addEventListener("submit", crearProducto);