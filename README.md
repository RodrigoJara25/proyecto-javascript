Sistema de Gestion de Inventario

Funcionalidad:
- Se cuenta con una pantalla de Login, la cual tiene como usuario y password "coder". Esta fue hecha con Bootstrap para mayor rapidez.
- Una vez dentro del sistema, se cargan productos y categorias simulando el uso de una API con dos .json
- Se cargan los datos de productos y categorias almacenados en el local sotrage
- Se compara los datos del local storage y de la API y se agregan al local storage los productos o categorias nuevas
- Luego de que se carguen correctamente, se renderiza la interfaz, mostrandonse en cards de productos y categorias
- Sigue la lógica, en la que se pide que se ingrese una opción y según esa se procede a realiza uno de las siguientes acciones: crear una categoria, crear un producto, agregar un producto a una vategoria y eliminar producto de una categoria
- Para cada una de estas opciones, se usan los eventos para generar dinamicamente etiquetas e interactuar con el DOM
- Se usaron librerias como Toastify y SeewtAlert para mostrar notifcaciones personalizadas para alertas de confirmación o error
  
Estructura de Archivos:
- classes: almacena las clases Producto.js y Categoria.js
- mocks: contiene los dos .json que simulan el llamado a una API
- pages: contiene el login.html
- scripts: se encuentran los dos archivos .js respectivos a la pagina de Login e Index
- services: contiene las funciones que controlan el cargado y recuperado de datos del Local Storage
