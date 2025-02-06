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
        
        Toastify({
            text: "Producto ingresado",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "red",
        }).showToast();
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
                Swal.fire({
                    title: "Producto eliminado correctamente!",
                    icon: "success",
                    draggable: true
                });

                // Limpiar y volver a imprimir los productos después de la eliminación
                listaProductos.innerText = this.imprimirProductos();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Producto no encontrado!"
                    })
            }

            // Limpiar el formulario después de la eliminación
            formulario.remove();
            listaProductos.remove();
            elegirProducto.remove();
        });
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