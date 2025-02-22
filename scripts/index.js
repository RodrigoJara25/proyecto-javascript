// ============================= FUNCIONES =============================
function crearProducto(){
    let nombre = document.getElementById("nombre-producto").value
    let cantidad = document.getElementById("cantidad-producto").value;
    let precio = document.getElementById("precio-producto").value;
    const producto = new Producto(nombre, cantidad, precio);
    return producto;
}

function crearCategoria(){
    let nombre = document.getElementById("nombre-categoria").value;
    const categoria = new Categoria(nombre);
    return categoria;
}

function mostrarInterfazProductos(){
    postsProducts.innerHTML = "";
    array_productos.forEach((post) => {
        let register = document.createElement("div")
        register.setAttribute("class", "divCard")
        register.innerHTML = `
            <h3>Nombre: ${post.nombre}</h3>
            <p>ID: ${post.id}</p>
            <p>Cantidad: ${post.cantidad}</p>
            <p>Precio: ${post.precio}</p>
        `;
        postsProducts.append(register);
    })
}

function mostrarInterfazCategorias(){
    postsCategories.innerHTML = ""
    array_categorias.forEach((post) => {
        let register = document.createElement("div")
        register.setAttribute("class", "divCard")
        register.innerHTML = `
            <h2>Categoria: ${post.nombre}</h2>
            <h3>Productos en la Categoria:</h3>
        `;
        post.array_productos.forEach((producto) =>{
            register.innerHTML += `
                <p>Producto: ${producto.nombre}</p>
            `;
        })
        postsCategories.append(register);
    })
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
// Preparamos el formulario que se va a generar segun la opcion que se elija de manera dinamica
let contenedorNuevoFormulario = document.getElementById("formulario-opciones");

// Cargamos los datos de la "API" y los mostramos en la interfaz

// 1) Cargamos Prodcutos
let postsProducts = document.getElementById("mostrarProductos") 
fetch('/mocks/productos.json')
    .then((response) => response.json())
    .then((data) => {
        cargarProductos();
        // let array_productos_JSON = data.map(prod => new Producto(prod.nombre, prod.cantidad, prod.precio));
        let array_productos_JSON = data;
        array_productos_JSON.forEach((producto_json)=>{
            if (!array_productos.some(producto_storage => producto_storage.nombre === producto_json.nombre)) {
                array_productos.push(new Producto(producto_json.nombre, producto_json.cantidad, producto_json.precio))
            }
        })
        /* {
        "id": 0,
        "nombre": "Manzana",
        "cantidad": 100,
        "precio": 1.5
        },*/
        mostrarInterfazProductos();
    })
    .catch( (error) => {
        Swal.fire({
            title: "?",
            text: "A ocurrido error al cargar los productos",
            icon: "question"
        });
    })
    .finally(()=>{
        guardarProductos();
    });

// 2) Cargamos Categorias
let postsCategories = document.getElementById("mostrarCategorias") 
fetch('/mocks/categorias.json')
    .then((response) => response.json())
    .then((data) => {
        cargarCategorias()
        let array_categorias_JSON = data.map(cat => new Categoria(cat.nombre));
        let array_categorias_productos = data.map(cat => (cat.array_productos));
        for (let i = 0; i < array_categorias_JSON.length; i++) {
            if (array_categorias_productos[i]) {
                array_categorias_JSON[i].array_productos = array_categorias_productos[i]; // Asiganmos a la primer categoria el array de sus productos correspndientes. Asi sucesivamente.
            }
            else{
                array_categorias_JSON.array_productos = []
            }
        }
        array_categorias_JSON.forEach((categoria_json)=>{
            if (!array_categorias.some(categoria_storage => categoria_storage.nombre === categoria_json.nombre)) {
                array_categorias.push(categoria_json)
            }
        })
        /* {
        "nombre": "Frutas",
        "array_productos": [
            {
                "id": 0,
                "nombre": "Manzana",
                "cantidad": 100,
                "precio": 1.5
            },
            {
                "id": 1,
                "nombre": "Banana",
                "cantidad": 150,
                "precio": 0.9
            },
        ]
        },*/
        mostrarInterfazCategorias()
    })
    .catch( (error) => {
        Swal.fire({
            title: "?",
            text: "A ocurrido error al cargar las categorias",
            icon: "question"
        });
    })
    .finally(()=>{
        guardarCategorias();
    });

// Creamos un formulario cada vez que se seleccione una opcion
let formulario = document.createElement("form");
formulario.setAttribute("id", "formulario-dinamico")
contenedorNuevoFormulario.append(formulario);
let form = ""

// Resetamos e; html de los fomrularios
const btnReset = document.getElementById("btnReset");
btnReset.addEventListener("click", (event)=>{
    event.preventDefault();
    contenedorNuevoFormulario.innerHTML = "";
})

// Recibo todos los botones de opciones
const btnCrearCategoria = document.getElementById("crearCategoria");
const btnCrearProducto = document.getElementById("crearProducto");
const btnAgregarProducto = document.getElementById("agregarProducto");
const btnEliminarProducto = document.getElementById("eliminarProducto");

btnCrearCategoria.addEventListener("click", (e)=>{
    e.preventDefault();
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
        formulario.remove();    // eliminamos el formulario luego de usarlo para que se vuyelva a generar cuando sea encesario

        // Actualizamos los arrays de productos y categorias en el localStorage
        guardarProductos();
        guardarCategorias();

        // Recargamos el HTML
        mostrarInterfazProductos();
        mostrarInterfazCategorias();

        // Mensaje de confirmacion
        Toastify({
            text: "Categoria creada",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
        }).showToast();
    })
})

btnCrearProducto.addEventListener("click", (e) => {
    e.preventDefault();
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
                Toastify({
                    text: "Producto creado",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                }).showToast();
                formulario.remove();    // eliminamos el formulario luego de usarlo para que se vuyelva a generar cuando sea encesario

                // Actualizamos los arrays de productos y categorias
                guardarProductos();
                guardarCategorias();
                // Recargamos el HTML
                mostrarInterfazProductos();
                mostrarInterfazCategorias();
            })
})

btnAgregarProducto.addEventListener("click", (e)=>{
    e.preventDefault();
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

        guardarProductos();
        guardarCategorias();
        
        mostrarInterfazProductos();
        mostrarInterfazCategorias();
    });
})

btnEliminarProducto.addEventListener("click", (e)=>{
    e.preventDefault();
    let listaCategorias2 = document.createElement("ul") 
            contenedorNuevoFormulario.append(listaCategorias2);
        
            array_categorias.forEach(categoria => {
                listaCategorias2.innerHTML += `<li class="categorias">${categoria.nombre}</li>`;
            });

            contenedorNuevoFormulario.append(formulario);
            form = document.getElementById("formulario-dinamico");
            formulario.innerHTML = `
                <br>
                <p>¿Qué categoria deseas elegir?</p>
                <label for="nombre-categoria">Nombre de la Categoria</label>
                <input type="text" id="nombre-categoria" name="nombre-categoria" placeholder="Ingrese el nombre de la categoria" required><br>
                <button type="submit">Guardar</button>
            `;
            form.addEventListener("submit", (event) => {
                event.preventDefault();
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
                formulario.remove(); 
            });
})