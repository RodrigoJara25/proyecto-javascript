console.log("Empezamos el sistema")

// ============================= CLASES =============================
// Clase Producto (id, nombre, cantidad, precio)
class Producto{
    // Propiedad estatica para llevar la cuenta automatica de los id
    static id = 0;

    // Inicializacion
    nombre = "";        // string
    cantidad = 0;       // int
    precio = 0;         // float

    // Constructor
    constructor(nombre, cantidad, precio) {
        // Incrementamos el id automaticamente
        this.id = Producto.id++;
        // Asiganmos los datos
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    // Metodos
}

// Clase Categoria (nombre)
class Categoria {
    // Inicializacion
    nombre = "";
    array_productos = [];

    // Constructor
    constructor(nombre) {
        this.nombre = nombre;
    }

    // Metodos

    // Ingresar producto en esta categoria
    ingresarProducto() {
        let nombre = prompt("Ingresar nombre del producto");
        let cantidad = parseInt(prompt("Ingresar cantidad del producto"));
        let precio = parseInt(prompt("Ingresar precio del producto"));
        const producto = new Producto(nombre, cantidad, precio);
        this.array_productos.push(producto)

        // Mostrar la informacion del producto agregado
        console.log("Informacion del producto ingresado: \n" + 
                "id: " + producto.id + "\n" +
                "nombre: " + producto.nombre + "\n" +
                "cantidad: " + producto.cantidad + "\n" +
                "precio: " + producto.precio + "\n" + "\n")
    }
    
    // Eliminar un Porducto de la Categoria (se borra de todos lados)
    eliminarProducto(){
        let id = prompt("Ingresar id del producto a eliminar");
        const productosActualizados = this.array_productos.filter((producto) => producto.id != id);
        this.array_productos = productosActualizados;

        // Mostrar los productos que quedan en esta categoria
        for (const producto of this.array_productos) {
            console.log(producto)
        }
        alert("Producto eliminado")
    }
}

// ============================= VARIABLES USADAS =============================

/*
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
    password_ingresada = prompt("Ingresa la contraseña para acceder como administrador")
    intento_actual++
}
if (password_ingresada === password_real) {
    do {
        cantidad_productos = prompt("¿Cuantos productos deseas ingresar?")
    } while (cantidad_productos < 0);
    for (let i = 0; i < cantidad_productos; i++) {
        ingresarProducto()
    }

    let opcion = ""

    while (opcion !== "ESC") {
        alert("¿Qué deseas hacer ahora?")
        opcion = prompt("Opciones: \n" + 
                        "eliminar producto\n" +
                        "agregar stock\n" +
                        "modificar precio\n" +
                        "modificar nombre\n" +
                        "Para salir: ESC")
        switch (opcion) {
            case "eliminar producto":
                eliminarProducto()
                break;
            case  "agregar stock":
                agregarStock()
                break;
            case "modificar precio":
                modificarPrecio()
                break;
            case "modificar nombre":
                modificarNombre()
                break;
            case "ESC":
                alert("Cerrando inventario...")
                break;
            default:
                alert("Opcion no disponible");
                break;
        }
    }
} else {
    alert("Limite de intentos excedido")
}
 */

let nom_categoria = prompt("Ingresar el nombre de la categoria: ");
const cat_frutas = new Categoria("nom_categoria");
cat_frutas.ingresarProducto()
cat_frutas.ingresarProducto()
cat_frutas.eliminarProducto()

