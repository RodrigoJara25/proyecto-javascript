class Producto{
    static id = 0;

    nombre = "";        // string
    cantidad = 0;       // int
    precio = 0;         // float

    constructor(nombre, cantidad, precio, id=null) {
        if (id === null) {
            this.id = Producto.id; 
            Producto.id++;
        } else {
            this.id = id;
            if (id > Producto.id) {
                Producto.id = id;
            }
        }
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    informacionProducto(){
        let cadena = "Id: " + this.id + 
                    "\nNombre: " + this.nombre + "\n"
        return cadena;
    }
}