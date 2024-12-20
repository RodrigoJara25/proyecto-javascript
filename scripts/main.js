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

    // Ingresar producto en esta categoria (crearlo defrente)
    ingresarProducto(producto) {
        // Agregamos el producto al array de esta categoria
        this.array_productos.push(producto)

        // Mostrar la informacion del producto agregado
        console.log("Informacion del producto ingresado: \n" + 
                "id: " + producto.id + "\n" +
                "nombre: " + producto.nombre + "\n" +
                "cantidad: " + producto.cantidad + "\n" +
                "precio: " + producto.precio + "\n" + "\n")
    }
    
    // Eliminar un Porducto de la Categoria 
    eliminarProducto(){
        let id = parseInt(prompt("Ingresar id del producto a eliminar"));
        const productoEncontrado = this.array_productos.some((producto) => producto.id == id);
        const productosActualizados = this.array_productos.filter((producto) => producto.id != id);
        this.array_productos = productosActualizados;
        if (!productoEncontrado) {
            alert("Producto no encontrado")
        } else{
            // Mostrar los productos que quedan en esta categoria
            for (const producto of this.array_productos) {
                console.log(producto)
            }
            alert("Producto eliminado")
        }
    }

    // Agregar Stock de un Producto
    agregarStock(){
        let id = parseInt(prompt("Ingresar el id del producto a aumentar stock"))
        const producto_agregar_stock = this.array_productos.find((producto) => producto.id === id)
        if (producto_agregar_stock == undefined) {
            alert("Producto no encontrado")
        } else {
            let cantidad_agregar = parseInt(prompt("¿Qué cantidad desea agregar?"))
            if (isNaN(cantidad_agregar)) {
                alert("Dato invalido");
            } else {
                producto_agregar_stock.cantidad = producto_agregar_stock.cantidad + cantidad_agregar; 
                alert("Stock agregado")
                console.log(producto_agregar_stock)
            }
        }
    }

    // Modificar el Precio de un Producto
    modificarPrecio(){
        let id = parseInt(prompt("Ingresar el id del producto a modificar precio"))
        const producto_modificar_precio = this.array_productos.find((producto) => producto.id === id)
        if (producto_modificar_precio == undefined) {
            alert("Producto no encontrado")
        } else{
            let precio = parseFloat(prompt("Ingresa el Nuevo Precio"));
            if (isNaN(precio)) {
                alert("Precio invalido")
            } else {
                producto_modificar_precio.precio = precio; 
                alert("Precio modificado")   
                
                // Verificar
                console.log(producto_modificar_precio);
            }
        }
    }

    // Modificar el nombre de un producto
    modificarNombre(){
        let id = parseInt(prompt("Ingresar el id del producto a modificar el nombre"));
        const producto_modificar_nombre = this.array_productos.find((producto) => producto.id === id)
        if (producto_modificar_nombre == undefined) {
            alert("Producto no encontrado")
        } else{
            let nombre = prompt("Ingrese el Nuevo Nombre")
            producto_modificar_nombre.nombre = nombre;
            alert("Nombre modificado")

            // verificar en consola
            console.log(producto_modificar_nombre);
        }
    }
}

// Clase Pedido
class Pedido {
    // Inicializacion
    cantidad = 0;
    nombre_producto = "";
    descripcion = "";
    precio_unitario = 0;
    total = ""

    constructor(cantidad, nombre_producto, precio_unitario){
        
    }
}

// Clase Factura
class Factura {
    // Inicializacion 
    num_boleta = 0;
    fecha_emision = ""
    nombre_empresa = ""
    ruc = ""
    dni_cliente = "000000000"
    nombre_cliente = ""
    
}



// ============================= FUNCIONES =============================
// Crear un Producto
function crearProducto(){
    let nombre = prompt("Ingresar nombre del producto");
    let cantidad = parseInt(prompt("Ingresar cantidad del producto"));
    let precio = parseInt(prompt("Ingresar precio del producto"));
    const producto = new Producto(nombre, cantidad, precio);
    return producto;
}

// Crear Categoria de Producto
function crearCategoria(){
    let nombre = prompt("Ingresar nombre de la categoria del producto");
    const categoria = new Categoria(nombre);
    return categoria;
}

/*
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

const cat_frutas = new Categoria("Frutas");
const producto1 = new Producto("Manzana", 5, 5);
const producto2 = new Producto("Pera", 7, 7);
const producto3 = new Producto("Durazno", 2, 2);
cat_frutas.ingresarProducto(producto1);
cat_frutas.ingresarProducto(producto2);
cat_frutas.ingresarProducto(producto3);
// cat_frutas.modificarNombre();

