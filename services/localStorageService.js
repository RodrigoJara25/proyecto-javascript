function cargarProductos() {
    array_productos_recuperado = JSON.parse(localStorage.getItem('productos')) || []
    array_productos = array_productos_recuperado.map(prod => new Producto(prod.nombre, prod.cantidad, prod.precio));
}

function guardarProductos() {  
    localStorage.setItem('productos', JSON.stringify(array_productos)); 
}

function cargarCategorias() {
    array_categorias_recuperado = JSON.parse(localStorage.getItem('categorias')) || []
    array_categorias = array_categorias_recuperado.map(cat => new Categoria(cat.nombre));
    array_categorias_productos = array_categorias_recuperado.map(cat => (cat.array_productos));
    for (let i = 0; i < array_categorias.length; i++) {
        if (array_categorias_productos[i]) {
            array_categorias[i].array_productos = array_categorias_productos[i];
        }
    }
}

function guardarCategorias() {
    localStorage.setItem('categorias', JSON.stringify(array_categorias));
}