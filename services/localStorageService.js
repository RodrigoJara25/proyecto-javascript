// cargarProductos()
function cargarProductos() {
    /* let productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        array_productos_recuperado = JSON.parse(productosGuardados); // Convertir de JSON a arreglo de objetos lo almacenado en el localStorage
        // Usar map para convertir cada objeto en una instancia de Producto
        array_productos = array_productos_recuperado.map(prod => new Producto(prod.nombre, prod.cantidad, prod.precio));
    } else {
        array_productos = []; // Si no hay productos guardados, se inicia vacío
    } */
    array_productos_recuperado = JSON.parse(localStorage.getItem('productos')) || []
    array_productos = array_productos_recuperado.map(prod => new Producto(prod.nombre, prod.cantidad, prod.precio));
}

// guardarProductos()
function guardarProductos() {   // Llamar funcion luego de eliminar o agregar un producto
    // Guardar la lista actualizada de productos en localStorage
    localStorage.setItem('productos', JSON.stringify(array_productos)); // Convertir de objeto a JSON para almacenarlo en el localStorage con la clave "productos"
}

// cargarCategorias()
function cargarCategorias() {
    /* let categoriasGuardadas = localStorage.getItem('categorias');
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
    } */

    array_categorias_recuperado = JSON.parse(localStorage.getItem('categorias')) || []
    array_categorias = array_categorias_recuperado.map(cat => new Categoria(cat.nombre));
    array_categorias_productos = array_categorias_recuperado.map(cat => (cat.array_productos));
    // Asignar productos a las categorías correspondientes
    for (let i = 0; i < array_categorias.length; i++) {
        if (array_categorias_productos[i]) {
            array_categorias[i].array_productos = array_categorias_productos[i]; // Asiganmos a la primer categoria el array de sus productos correspndientes. Asi sucesivamente.
        }
    }
}

// guardarCategorias()
function guardarCategorias() {
    // Guardar todas las categorías en localStorage
    localStorage.setItem('categorias', JSON.stringify(array_categorias));
}