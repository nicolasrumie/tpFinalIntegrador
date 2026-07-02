// 2. Función principal que se ejecuta al hacer click
async function login() {
    limpiarError(); // Limpiar errores previos antes de validar nuevamente

    const nameInput = document.getElementById("input-nombre");
    const username = nameInput.value.trim();
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Validaciones en el Frontend
    if(!username){
        mostrarError("El nombre es obligatorio.");
        return;
    }

    if (!soloLetras.test(username)) {
        mostrarError("El nombre solo debe contener letras.");
        return;
    }
    
    if (username.length < 2) {
        mostrarError("El nombre debe tener al menos 2 caracteres.");
        return;
    }

    

    // Si todo está bien, limpiamos errores viejos antes de llamar al servidor
    limpiarError();

    try {
        const response = await fetch("/index", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre: username })
        });

        ;
        
        const data = await response.json();

        if (!response.ok) {
            mostrarError(data.message); // Si el backend rechaza, muestra el por qué
            return;
        } 

        if (data.redirectUrl) {
            sessionStorage.setItem("username", username); // Guardo el nombre en sessionStorage
            window.location.href = data.redirectUrl;
        }

    } catch (error) {
        console.error("Error en la conexión Fetch:", error);
        mostrarError("Hubo un problema de conexión con el servidor.");
    }
}

function mostrarError(mensaje) {
    formContainer = document.querySelector(".contenedor-errores");
    formContainer.innerHTML += `
        <p class="mensaje-error">${mensaje}</p>
    `;
};

function limpiarError() {
    const errorMessage = document.getElementsByClassName("mensaje-error")[0];
    if (errorMessage) {
        errorMessage.remove();
    }
};

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn-continuar").addEventListener("click", login);
});