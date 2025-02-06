console.log("Empezamos el sistema")

// ============================= CLASES =============================
// Clase Producto (id (static), nombre, cantidad, precio)
// Clase Categoria (nombre)

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
// cargarProductos()
// guardarProductos()
// cargarCategorias()
// guardarCategorias()

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

    // Si se presiona "Resetear" se elimina todo lo generado
    formularioOpcion.addEventListener("reset", (event)=>{
        contenedorNuevoFormulario.innerHTML = "";
    })

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
                console.log("Categoria agregada:" + categoria?.nombre)
                formulario.remove();    // eliminamos el formulario luego de usarlo para que se vuyelva a generar cuando sea encesario

                // Actualizamos los arrays de productos y categorias en el localStorage
                guardarProductos();
                guardarCategorias();
                Toastify({
                    text: "Categoria creada",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
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
                console.log("Producto agregado:" + producto?.nombre)
                console.log("Cantidad:" + producto?.cantidad)
                console.log("Precio:" + producto?.precio)
                Toastify({
                    text: "Producto creado",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
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
        
                /* if (!producto_elegido || !categoria_elegida) {
                    // No existe la categoría o el producto
                    alert("Categoría o Producto no existente");
                } else {
                    // Agregamos el producto a la categoría elegida
                    categoria_elegida.ingresarProducto(producto_elegido);
                } */
                (!producto_elegido || !categoria_elegida)  
                    ? Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Categoría o Producto no existente!"
                        })  
                    : categoria_elegida.ingresarProducto(producto_elegido);


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
                    Swal.fire({
                        icon: "error",
                        title: "Ocurrió un error...",
                        text: "Categoría no encontrada!"
                    })
                } else {
                    categoria_elegida.eliminarProducto()
                    listaCategorias2.remove()   
                }
                formulario.remove();  // Eliminamos el formulario luego de usarlo para que se vuelva a generar cuando sea necesario
            });
            // Actualizamos los arrays de productos y categorias
            guardarProductos();
            guardarCategorias();
            break;
        default:
            Swal.fire({
                icon: "error",
                title: "Ocurrió un error...",
                text: "Opción no disponible!"
                })
            break;
    }

})


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

