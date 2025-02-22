class Categoria {
    nombre = "";
    array_productos = [];

    constructor(nombre) {
        this.nombre = nombre;
    }

    ingresarProducto(producto) {
        this.array_productos.push(producto)

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
    
    eliminarProducto(){
        let listaProductos = document.createElement("pre");
        listaProductos.innerText = this.imprimirProductos(); 
        contenedorNuevoFormulario.append(listaProductos);

        let elegirProducto = document.createElement("h2");
        elegirProducto.innerText = "Elige un producto para eliminar (ingresa el id)";
        contenedorNuevoFormulario.append(elegirProducto);

        let formulario = document.createElement("form");
        formulario.setAttribute("id", "formulario-dinamico");
        contenedorNuevoFormulario.append(formulario);
        formulario.innerHTML = `
            <label for="id-producto">ID del Producto</label>
            <input type="text" id="id-producto" name="id-producto" placeholder="Ingrese el ID del producto" required>
            <button type="submit">Eliminar</button>
        `;

        formulario.addEventListener("submit", (event) => {
            event.preventDefault();
            let id = parseInt(document.getElementById("id-producto").value);

            const productoIndex = this.array_productos.findIndex((producto) => producto.id === id);

            if (productoIndex !== -1) {
                this.array_productos.splice(productoIndex, 1);
                Swal.fire({
                    title: "Producto eliminado correctamente!",
                    icon: "success",
                    draggable: true
                });

                listaProductos.innerText = this.imprimirProductos();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Producto no encontrado!"
                    })
            }

            formulario.remove();
            listaProductos.remove();
            elegirProducto.remove();

            guardarProductos();
            guardarCategorias();

            mostrarInterfazProductos();
            mostrarInterfazCategorias();
        });
    }

    imprimirProductos() {
        let listaProductos = "";
        this.array_productos.forEach(producto => {
            listaProductos += `Id: ${producto.id} - Nombre: ${producto.nombre}\n`;
        });
        return listaProductos;
    }
}