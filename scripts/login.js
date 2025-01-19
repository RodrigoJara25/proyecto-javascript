console.log("Pagina De Login")

let limite_intentos = 3
let intento_actual = 0
let password_real = "coder"
let usuario_real = "coder"

const formulario = document.getElementById("formulario-login")
const botonEnviarFormulario = document.getElementById("formulario-submit")
console.log("Todo bien")

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value
    const password_ingresada = document.getElementById("password").value

    console.log("Usuario ingresado: " + usuario)
    console.log("Password ingresada: " + password_ingresada)
    
    const cantidadIntentos = document.getElementById("cantidad-intentos")

    // Verifica el intento
    if (password_ingresada === password_real && usuario_real === usuario) {
        alert("Acceso concedido");
        window.location.href = "../index.html"; // Colocar la url de la pagina a redirigir
    } else {
        intento_actual++; // Incrementa el número de intentos
        const intentos_restantes = limite_intentos - intento_actual;

        if (intento_actual < 3) {
            cantidadIntentos.innerText = `Intentos restantes: ${intentos_restantes}`;
            alert("Password incorrecta. Intenta de nuevo.");
        } else {
            cantidadIntentos.innerText = `Intentos restantes: 0`;
            alert("Límite de intentos excedido. Acceso denegado.");
            botonEnviarFormulario.setAttribute("disabled", "true"); // Agrega el atributo disabled al boton submit para que ya no se pueda realizar mas intentos
        }
    }
})
