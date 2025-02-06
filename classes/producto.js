class Producto{
    // Propiedad estatica para llevar la cuenta automatica de los id
    static id = 0;

    // Inicializacion
    nombre = "";        // string
    cantidad = 0;       // int
    precio = 0;         // float

    // Constructor
    constructor(nombre, cantidad, precio, id=null) {
        // Incrementamos el id automaticamente
        // Si no se pasa un ID, se asigna el siguiente ID automáticamente
        if (id === null) {
            this.id = Producto.id;  // Incrementamos el ID antes de asignarlo
            Producto.id++;
        } else {
            this.id = id;
            // Si se pasa un ID que es mayor que el id actual, actualizamos Producto.id
            if (id > Producto.id) {
                Producto.id = id;
            }
        }
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