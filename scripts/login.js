let limite_intentos = 3
let intento_actual = 0
let password_real = "coder"
let usuario_real = "coder"

const formulario = document.getElementById("formulario-login")
const botonEnviarFormulario = document.getElementById("formulario-submit")

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value
    const password_ingresada = document.getElementById("password").value
    
    const cantidadIntentos = document.getElementById("cantidad-intentos")

    // Verifica el intento
    if (password_ingresada === password_real && usuario_real === usuario) {
        window.location.href = "../index.html"; 
    } else {
        intento_actual++; 
        const intentos_restantes = limite_intentos - intento_actual;

        if (intento_actual < 3) {
            cantidadIntentos.innerText = `Intentos restantes: ${intentos_restantes}`;
        } else {
            cantidadIntentos.innerText = `Intentos restantes: 0`;
            botonEnviarFormulario.setAttribute("disabled", "true"); 
        }
    }
})
