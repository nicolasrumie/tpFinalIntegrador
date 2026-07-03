const btnAccesoRapido = document.getElementById("btn-acceso-rapido");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

btnAccesoRapido.addEventListener("click", () => {
    inputEmail.value = "admin@mizuta.com";
    inputPassword.value = "admin123";
});