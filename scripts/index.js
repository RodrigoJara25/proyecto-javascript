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
    informacionProducto(){
        let cadena = "Id: " + this.id + 
                    "\nNombre: " + this.nombre + "\n"
        return cadena;
    }
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
        // Mostramos la lista de productos en el contenedor
        let listaProductos = document.createElement("pre");
        listaProductos.innerText = this.imprimirProductos(); // Mostramos la lista de productos
        contenedorNuevoFormulario.append(listaProductos);

        let elegirProducto = document.createElement("h2");
        elegirProducto.innerText = "Elige un producto para eliminar (ingresa el id)";
        contenedorNuevoFormulario.append(elegirProducto);

        // Agregamos el formulario para ingresar el id del producto a eliminar
        let formulario = document.createElement("form");
        formulario.setAttribute("id", "formulario-dinamico");
        contenedorNuevoFormulario.append(formulario);
        formulario.innerHTML = `
            <label for="id-producto">ID del Producto</label>
            <input type="text" id="id-producto" name="id-producto" placeholder="Ingrese el ID del producto" required>
            <button type="submit">Eliminar</button>
        `;

        // Escuchamos el evento de submit para eliminar el producto
        formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            let id = parseInt(document.getElementById("id-producto").value);

            // Buscamos el producto por su ID en el arreglo actual
            const productoIndex = this.array_productos.findIndex((producto) => producto.id === id);

            if (productoIndex !== -1) {
                // Si el producto fue encontrado, lo eliminamos
                this.array_productos.splice(productoIndex, 1);
                alert("Producto eliminado");

                // Limpiar y volver a imprimir los productos después de la eliminación
                listaProductos.innerText = this.imprimirProductos();
            } else {
                alert("Producto no encontrado");
            }

            // Limpiar el formulario después de la eliminación
            formulario.remove();
            listaProductos.remove();
            elegirProducto.remove();
        });

        //const productoEncontrado = this.array_productos.some((producto) => producto.id == id);
        /* const productosActualizados = this.array_productos.filter((producto) => producto.id != id);
        this.array_productos = productosActualizados;
        if (!productoEncontrado) {
            alert("Producto no encontrado")
        } else{
            // Mostrar los productos que quedan en esta categoria
            for (const producto of this.array_productos) {
                console.log(producto)
            }
            alert("Producto eliminado")
        } */
    }

    // Agregar Stock de un Producto
    agregarStock(){
        let cadena = this.imprimirProductos();
        let id = parseInt(prompt("Productos en esta categoria: \n" + cadena + "Ingresar el id del producto a aumentar stock"))
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
        let cadena = this.imprimirProductos();
        let id = parseInt(prompt("Productos en esta categoria: \n" + cadena + "Ingresar el id del producto a modificar precio"))
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
        let cadena = this.imprimirProductos();
        let id = parseInt(prompt("Productos en esta categoria: \n" + cadena + "Ingresar el id del producto a modificar el nombre"));
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

    // Imprimir productos dentro de esta categoria
    imprimirProductos() {
        let listaProductos = "";
        this.array_productos.forEach(producto => {
            listaProductos += `Id: ${producto.id} - Nombre: ${producto.nombre}\n`;
        });
        return listaProductos;
    }
}
/* // Clase Pedido
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
    
} */



// ============================= FUNCIONES =============================
// Crear un Producto
function crearProducto(){
    let nombre = document.getElementById("nombre-producto").value
    let cantidad = document.getElementById("cantidad-producto").value;
    let precio = document.getElementById("precio-producto").value;
    const producto = new Producto(nombre, cantidad, precio);
    return producto;
}

// Crear Categoria de Producto
function crearCategoria(){
    let nombre = document.getElementById("nombre-categoria").value;
    const categoria = new Categoria(nombre);
    return categoria;
}

// ============================ Storage y JSON ========================
function cargarProductos() {
    let productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        array_productos_recuperado = JSON.parse(productosGuardados); // Convertir de JSON a arreglo de objetos lo almacenado en el localStorage
        // Usar map para convertir cada objeto en una instancia de Producto
        array_productos = array_productos_recuperado.map(prod => new Producto(prod.nombre, prod.cantidad, prod.precio));
    } else {
        array_productos = []; // Si no hay productos guardados, se inicia vacío
    }
}

function guardarProductos() {   // Llamar funcion luego de eliminar o agregar un producto
    // Guardar la lista actualizada de productos en localStorage
    localStorage.setItem('productos', JSON.stringify(array_productos)); // Convertir de objeto a JSON para almacenarlo en el localStorage con la clave "productos"
}

function cargarCategorias() {
    let categoriasGuardadas = localStorage.getItem('categorias');
    if (categoriasGuardadas) {
        array_categorias_recuperado = JSON.parse(categoriasGuardadas); // Convertir JSON a objetos
        // Si 'categorias' es un array de objetos y necesitas instancias de una clase:
        array_categorias = array_categorias_recuperado.map(cat => new Categoria(cat.nombre));
        array_categorias_productos = array_categorias_recuperado.map(cat => (cat.array_productos));
        // Asignar productos a las categorías correspondientes
        for (let i = 0; i < array_categorias.length; i++) {
            if (array_categorias_productos[i]) {
                array_categorias[i].array_productos = array_categorias_productos[i]; // Asiganmos a la primer categoria el array de sus productos correspndientes. Asi sucesivamente
            }
        }
    } else {
        array_categorias = []; // Si no hay categorías guardadas, inicializar como vacío
    }
}

function guardarCategorias() {
    // Guardar todas las categorías en localStorage
    localStorage.setItem('categorias', JSON.stringify(array_categorias));
}

// ============================= VARIABLES =============================
// Array de las Categorias creadas
let array_categorias = []
// Array de los Productos creados
let array_productos = []

// ============================= EJECUCION DEL CODIGO =============================
// alert("Bienvenido al sistema de inventario")

// Seleccionamos el formulario donde se marca la opcion que se quiere hacer
let formularioOpcion = document.getElementById("formulario-opcion")

// Preparamos el formulario que se va a generar segun la opcion que se elija de manera dinamica
let contenedorNuevoFormulario = document.getElementById("formulario-opciones");

// Cargamos del localStorage los productos y categorias (si es que hubieran)
cargarCategorias();
cargarProductos();

// Cuando el formulario de opciones sea enviado (submit) verificamos cual fue la opcion enviada
formularioOpcion.addEventListener("submit", (event)=>{
    event.preventDefault();

    // Creamos un formulario cada vez que se seleccione una opcion
    let formulario = document.createElement("form");
    formulario.setAttribute("id", "formulario-dinamico")
    contenedorNuevoFormulario.append(formulario);
    let form = ""

    let opcion = document.getElementById("opcion").value;   // Agarramos el valor del input (que va a ser el numero de la opcion)

    switch (opcion) {
        // Si es la opcion "1", entonces creamos un formulario dentro del contenedor formulario con los campos necesarios (nombre de la categoria)
        case "1":
            // Asignamos el formulario dentro del contenedor (que es la section)
            contenedorNuevoFormulario.append(formulario);
            form = document.getElementById("formulario-dinamico")
            formulario.innerHTML = `<label for="nombre-categoria">Nombre de la Categoría</label>
                                    <input type="text" id="nombre-categoria" name="nombre-categoria" placeholder="Ingrese el nombre de la categoría" required>
                                    <button type="submit">Guardar</button>`
            // Cuando ese nuevo formulario dinamico sea enviado (submit), creamos la categoria con sus datos
            form.addEventListener("submit", (event) => {
                event.preventDefault()
                let categoria = crearCategoria();
                array_categorias.push(categoria);
                console.log("Categoria agregada:" + categoria.nombre)
                formulario.remove();    // eliminamos el formulario luego de usarlo para que se vuyelva a generar cuando sea encesario

                // Actualizamos los arrays de productos y categorias en el localStorage
                guardarProductos();
                guardarCategorias();
            })
            break;
        case "2":
            contenedorNuevoFormulario.append(formulario);
            form = document.getElementById("formulario-dinamico")
            formulario.innerHTML = `
                <label for="nombre-producto">Nombre del Producto</label>
                <input type="text" id="nombre-producto" name="nombre-producto" placeholder="Ingrese el nombre del producto" required><br>

                <label for="cantidad-producto">Cantidad</label>
                <input type="number" id="cantidad-producto" name="cantidad-producto" placeholder="Ingrese la cantidad" min="1" required><br>

                <label for="precio-producto">Precio</label>
                <input type="number" id="precio-producto" name="precio-producto" placeholder="Ingrese el precio" min="0.01" step="0.01" required><br>

                <button type="submit">Guardar</button>
            `;
            form.addEventListener("submit", (event) => {
                event.preventDefault()
                let producto = crearProducto();
                array_productos.push(producto);
                console.log("Producto agregado:" + producto.nombre)
                console.log("Cantidad:" + producto.cantidad)
                console.log("Precio:" + producto.precio)
                formulario.remove();    // eliminamos el formulario luego de usarlo para que se vuyelva a generar cuando sea encesario
            })
            // Actualizamos los arrays de productos y categorias
            guardarProductos();
            guardarCategorias();
            break;
        case "3":       
            // Crear el título de productos
            let tituloProductos = document.createElement("h2");
            tituloProductos.textContent = "Productos";
            contenedorNuevoFormulario.append(tituloProductos);

            let listaProductos = document.createElement("ul");
            contenedorNuevoFormulario.append(listaProductos);
        
            array_productos.forEach(producto => {
                listaProductos.innerHTML += `<li class="productos">${producto.informacionProducto()}</li>`;
            });
        
            // Crear el título de categorías
            let tituloCategorias = document.createElement("h2");
            tituloCategorias.textContent = "Categorías";
            contenedorNuevoFormulario.append(tituloCategorias);

            let listaCategorias = document.createElement("ul");
            contenedorNuevoFormulario.append(listaCategorias);
        
            array_categorias.forEach(categoria => {
                listaCategorias.innerHTML += `<li class="categorias">${categoria.nombre}</li>`;
            });
        
            // Crear el formulario
            contenedorNuevoFormulario.append(formulario);
            form = document.getElementById("formulario-dinamico");
        
            formulario.innerHTML = `
                <br>
                <p>¿Qué producto quieres agregar?</p>
                <label for="nombre-producto">Nombre del Producto</label>
                <input type="text" id="nombre-producto" name="nombre-producto" placeholder="Ingrese el nombre del producto" required><br>
        
                <br>
                <p>¿A qué categoría deseas agregar?</p>
                <br>
                <label for="nombre-categoria">Nombre de la Categoria</label>
                <input type="text" id="nombre-categoria" name="nombre-categoria" placeholder="Ingrese el nombre de la categoria" required><br>
        
                <button type="submit">Guardar</button>
            `;
        
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                let nombre_producto = document.getElementById("nombre-producto").value;
                let producto_elegido = array_productos.find((producto) => producto.nombre == nombre_producto);
        
                let nombre_categoria = document.getElementById("nombre-categoria").value;
                let categoria_elegida = array_categorias.find((categoria) => categoria.nombre == nombre_categoria);
        
                if (!producto_elegido || !categoria_elegida) {
                    // No existe la categoría o el producto
                    alert("Categoría o Producto no existente");
                } else {
                    // Agregamos el producto a la categoría elegida
                    categoria_elegida.ingresarProducto(producto_elegido);
                }
                formulario.remove();  // Eliminamos el formulario luego de usarlo para que se vuelva a generar cuando sea necesario
                listaCategorias.remove();
                tituloCategorias.remove();
                listaProductos.remove();
                tituloProductos.remove();

                // Actualizamos los arrays de productos y categorias
                guardarProductos();
                guardarCategorias();
            });
            
            break;
        case  "4":      // Eliminar producto
            // debugger
            let listaCategorias2 = document.createElement("ul") 
            contenedorNuevoFormulario.append(listaCategorias2);
        
            array_categorias.forEach(categoria => {
                listaCategorias2.innerHTML += `<li class="categorias">${categoria.nombre}</li>`;
            });

            // Crear el formulario
            contenedorNuevoFormulario.append(formulario);
            form = document.getElementById("formulario-dinamico");
            formulario.innerHTML = `
                <br>
                <p>¿Qué categoria deseas elegir?</p>
                <label for="nombre-categoria">Nombre de la Categoria</label>
                <input type="text" id="nombre-categoria" name="nombre-categoria" placeholder="Ingrese el nombre de la categoria" required><br>
                <button type="submit">Guardar</button>
            `;
            // debugger
            form.addEventListener("submit", (event) => {
                nombre_categoria = document.getElementById("nombre-categoria").value;
                categoria_elegida = array_categorias.find((categoria) => categoria.nombre == nombre_categoria);
                if (categoria_elegida == undefined) {
                    alert("Categoria no encontrada")
                } else {
                    categoria_elegida.eliminarProducto()
                    listaCategorias2.remove()   
                }
                formulario.remove();  // Eliminamos el formulario luego de usarlo para que se vuelva a generar cuando sea necesario
            });

            /* for (const categoria of array_categorias) {
                cadena2 += "- " + categoria.nombre + "\n"
            }
            nombre_categoria = prompt("Que categoria deseas elegir? \n" + cadena2 + "\nEscribe el nombre: ");
            categoria_elegida = array_categorias.find((categoria) => categoria.nombre == nombre_categoria);
            if (categoria_elegida == undefined) {
                alert("Categoria no encontrada")
            } else {
                categoria_elegida.eliminarProducto()   
            }*/
            // Actualizamos los arrays de productos y categorias
            guardarProductos();
            guardarCategorias();
            break;
        case "5":
            let cadena3 = "";
            for (const categoria of array_categorias) {
                cadena3 += "- " + categoria.nombre + "\n"
            }
            nombre_categoria = prompt("Que categoria deseas elegir? \n" + cadena3 + "\nEscribe el nombre: ");
            categoria_elegida = array_categorias.find((categoria) => categoria.nombre == nombre_categoria);
            if (categoria_elegida == undefined) {
                alert("Categoria no encontrada")
            } else {
                categoria_elegida.agregarStock() 
            }
            break;
        case "6":
            let cadena4 = "";
            for (const categoria of array_categorias) {
                cadena4 += "- " + categoria.nombre + "\n"
            }
            nombre_categoria = prompt("Que categoria deseas elegir? \n" + cadena4 + "\nEscribe el nombre: ");
            categoria_elegida = array_categorias.find((categoria) => categoria.nombre == nombre_categoria);
            if (categoria_elegida == undefined) {
                alert("Categoria no encontrada")
            } else {
                categoria_elegida.modificarPrecio()
            }
            break;
        case "7":
            let cadena5 = "";
            for (const categoria of array_categorias) {
                cadena5 += "- " + categoria.nombre + "\n"
            }
            nombre_categoria = prompt("Que categoria deseas elegir? \n" + cadena5 + "\nEscribe el nombre: ");
            categoria_elegida = array_categorias.find((categoria) => categoria.nombre == nombre_categoria);
            if (categoria_elegida == undefined) {
                alert("Categoria no encontrada")
            } else {
                categoria_elegida.modificarNombre()
            }
            break;
        default:
            alert("Opcion no disponible");
            break;
    }

})

/* alert("¿Que deseas hacer?")
opcion = prompt("Opciones: \n" + 
                "1. Crear una categoria \n" + 
                "2. Crear un producto\n" +
                "3. Agregar producto a una categoria\n" + 
                "4. Eliminar producto de una categoria\n" +
                "5. Agregar stock\n" +
                "6. Modificar precio\n" +
                "7. Modificar nombre\n" +
                "Para salir: ESC")

let nombre_categoria = ""; */



/* const cat_frutas = new Categoria("Frutas");
const producto1 = new Producto("Manzana", 5, 5);
const producto2 = new Producto("Pera", 7, 7);
const producto3 = new Producto("Durazno", 2, 2);
array_categorias.push(cat_frutas);
array_productos.push(producto1);
array_productos.push(producto2);
array_productos.push(producto3);
cat_frutas.ingresarProducto(producto1);
cat_frutas.ingresarProducto(producto2);
cat_frutas.ingresarProducto(producto3); */

