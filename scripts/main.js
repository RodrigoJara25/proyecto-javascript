console.log("Empezamos el sistema")

function ingresarProducto() {
    let id = prompt("Ingresar id del producto")
    let nombre = prompt("Ingresar nombre del producto")
    let cantidad = parseInt(prompt("Ingresar cantidad del producto"))
    let precio = parseInt(prompt("Ingresar precio del producto"))
    alert("Informacion del producto ingresado: \n" + 
            "id: " + id + "\n" +
            "nombre: " + nombre + "\n" +
            "cantidad: " + cantidad + "\n" +
            "precio: " + precio + "\n")
    console.log("Informacion del producto ingresado: \n" + 
            "id: " + id + "\n" +
            "nombre: " + nombre + "\n" +
            "cantidad: " + cantidad + "\n" +
            "precio: " + precio + "\n" + "\n")
    // return id, nombre, cantidad, precio
}

function eliminarProducto(){
    let id = prompt("Ingresar id del producto a eliminar")
    id = null
    nombre = null
    cantidad = null
    precio = null
    alert("Producto eliminado")
}

function agregarStock(){
    let id = prompt("Ingresar el id del producto a aumentar stock")
    let cantidad_agregar = parseInt(prompt("Cantidad agregada"))
    alert("Stock agregado")
}

function modificarPrecio(){
    let id = prompt("Ingresar el id del producto a modificar precio")
    let precio = parseInt(prompt("Nuevo precio"))
    alert("Precio modificado")
}

function modificarNombre(){
    let id = prompt("Ingresar el id del producto a modificar el nombre")
    let nombre = prompt("Nuevo nombre")
    alert("Nombre modificado")
}

alert("Bienvenido al sistema de inventario")
let limite_intentos = 3
let intento_actual = 0
let password_real = "coder"
let password_ingresada = prompt("Ingresa la contraseña para acceder como administrador")
while (password_real !== password_ingresada && intento_actual < limite_intentos) {
    let password_ingresada = prompt("Ingresa la contraseña para acceder como administrador")
}
if (password_ingresada === password_real) {
    do {
        cantidad_productos = prompt("¿Cuantos productos deseas ingresar?")
    } while (cantidad_productos < 0);
    for (let i = 0; i < cantidad_productos; i++) {
        ingresarProducto()
    }

    alert("¿Qué deseas hacer ahora?")
    let opcion = prompt("Opciones: \n" + 
                    "eliminar producto\n" +
                    "agregar stock\n" +
                    "modificar precio\n" +
                    "modificar nombre\n" +
                    "Para salir: ESC")
    while (opcion !== "ESC") {
        switch (opcion) {
            case "eliminar producto":
                eliminarProducto()
                break;
            case  "agregar stock":
                agregarStock()
            case "modificar precio":
                modificarPrecio()
            case "modificar nombre":
                modificarNombre()
            default:
                alert("Opcion no disponible");
        }
    }
} else {
    alert("Limite de intentos excedido")
}
