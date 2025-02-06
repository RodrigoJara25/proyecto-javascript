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