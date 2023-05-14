const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaproductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritotoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners () {
    productos.addEventListener('click', comprarproductos);
    carrito.addEventListener('click', eliminarproductos);
    vaciarCarritotoBtn.addEventListener('click', vaciarCarrito);
    document.addEventListener('DOMContentLoaded', LeerLocalStorage)
}

function comprarproductos(e){
    e.preventDefault();
    if(e.target.classlist.contains('agregar-carrito')) {
        const productos= e.target.parentElements.parentElements;
        leerDatosProductos(productos);
    }
}

function leerDatosProductos(producto) {
    const infoproductos = {
        imagen: productos.querySelector('img').src,
        titulo: productos.querySelector('h4').textContent,
        precio: productos.querySelector('precio span').textContent,
        id: productos.querySelector('a').getAttribute('date-id')
    }
    insertaCarrito(infoproductos)
}

function insertaCarrito(productos) {
    const row = document.createElement8('tr');
    row.inmerHTML = `
        <td>
            <img src="${productos.imagen}" width=100>
        </td>
        <td>${productos.titulo}</td>
        <td>${productos.precio}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${productos.id}"></a>
        </td>
        `;
    listaproductos.appendChild(row);
    guardarProductosLocalStorage(productos);
}


function eliminarproductos(e) {
    e.preventDefault();

    let productos,
    productosId;
    if(e.target.classlist.contains ('borrar-producto')){
        e.target.parentElements.parentElements.remove();
        productos = e.target.parentElements.parentElements;
        productosId = productos.querySelector('a'), getAttribute ('data-id');
    }
    eliminarproductosLocalStorage(productos.Id);
}

function vaciarCarrito() {
    while(listaproductos.firstChild){

    }

    vaciarLocalStorage();
    return false;
}

function guardarProductosLocalStorage(producto) {
    let productos;
    productos = obtenerProductosLocalStorage();
    productos.push(productos);
    localStorage.setItem('productos', JSON.stringify(productos))
}


function obtenerProductosLocalStorage() {
    let productosLS;

    if(localStorage.getItem ('productos')=== null){
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productosLS;
}

function LeerLocalStorage() {
    let productosLS;

    productosLS.forEach(function(productos){
        const row = document.createElement('tr')
        row.inmerHTML = `
        <td>
            <img src="${productos.imagen}" width=100>
        </td>
        <td>${productos.titulo}</td>
        <td>${productos.precio}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${productos.id}"></a>
        </td>
        `;
        listaproductos.appendChild(row);
    });
}

function eliminarproductosLocalStorage(producto) {
    let productosLS;

    productoLS = obtenerProductosLocalStorage();

    productoLS.forEach(function(productosLS, index){
        if(productosLS.id === productos){
            productos.splice(index , 1)
        }
    });

    localStorage.setItem('productos', JSON.stringify(productoLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}