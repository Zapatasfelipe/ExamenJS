let productos = [
    {id:1, nombre:"Smartphone Redmi A1 32GB/2GB Verde Liberado", color:"verde", ram:4
    ,precio:250000,categoria:"Celular",imagen:"https://www.pcfactory.cl/public/foto/48014/1_1000.jpg?t=1688054349284"},
    {id:2, nombre:"Smartphone Moto E13 64GB/2GB Verde Wom", color:"azul", ram:6
    ,precio:300000,categoria:"Celular",imagen:"https://www.pcfactory.cl/public/foto/47806/1_1000.jpg?t=1695987488412"},
    {id:3, nombre:"Smartphone Galaxy A04e 32GB/3GB Negro Movistar", color:"negro", ram:8
    ,precio:500000,categoria:"Celular",imagen:"https://www.pcfactory.cl/public/foto/47224/1_1000.jpg?t=1696216143289"},
    {id:4, nombre:"Notebook 250 G8 Intel i3-1115 15.6 HD 8GB 256SSD FREE DOS Plateado ceniza oscuro", color:"Plateado", ram:8
    ,precio:750000,categoria:"Computador",imagen:"https://www.pcfactory.cl/public/foto/49836/1_1000.jpg?t=1694093891866"},
    {id:5, nombre:"Notebook ASUS Vivobook Go 14 E1404 Intel i3-N305 14 FHD 60Hz 8GB 256 SSD Windows 11", color:"negro", ram:8
    ,precio:900000,categoria:"Computador",imagen:"https://www.pcfactory.cl/public/foto/48743/1_1000.jpg?t=1696216572652"},

]

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos",JSON.stringify(productos));
}

const cargarProductosLS = () =>{
    return JSON.parse(localStorage.getItem("productos")) || [];
}



const renderProductos = () =>{
    const productos = cargarProductosLS();
    let contenidoHTML = "";
    productos.forEach(producto => {
        contenidoHTML += `<div class="col-md-3 mb-5 text-center"
        <div class="card">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <h4 class="card-text">$${producto.precio}</h4>
          <a href="#" class="btn btn-success" onclick="agregarProductoCarrito(${producto.id})" >Agregar al Carro</a>
        </div>
        </div>
      </div>`
    });

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const renderCarrito = () =>{
    const productos = cargarCarritoLS();
    let contenidoHTML;
    if(cantProductosCarrito()>0){
        contenidoHTML = `<table class="table">`;

    productos.forEach(producto => {
        contenidoHTML += `<tr>
        <td><img src="${producto.imagen}" alt="${producto.nombre}" width="32"></td>
        <td class="align-items-center">${producto.nombre}</td>
        <td class="align-items-center">$${producto.precio}  <button class="btn btn-warning rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button>${ producto.cantidad }<button class="btn btn-warning rounded-circle" onclick="incrementarCantidadProducto(${producto.id})"> + </button></td>
        <td class="align-items-center">$${producto.precio * producto.cantidad}</td>
        <td><img src="../../After3/assets/Icon/trash-fill (1).svg" class="card-img-top" alt="Eliminar" widht="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
        </tr>`
    });

    contenidoHTML += `<tr>
    <td>Total</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td colspan="3" class="text-start"><b>$${sumaProductosCarrito()}</b></td>
    <td>&nbsp;</td>
    </tr>
    </table>`;
    }else{
        contenidoHTML = `<div class="alert alert-warning my-5 text-center" role="alert">
        No hay productos en el carrito
      </div>`
    }
    
    
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const guardarCarritoLS = (carrito) => {
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

const cargarCarritoLS = () =>{
    return JSON.parse(localStorage.getItem("carrito")) || [];
}


const agregarProductoCarrito = (id) =>{
    const carrito = cargarCarritoLS();
    

    if(estaEnElCarrito(id)){
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
    }else{
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }
    
    
    guardarCarritoLS(carrito);
    renderBotonCarrito();


}

const eliminarProductoCarrito = (id) =>{
    const carrito = cargarCarritoLS();
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    guardarCarritoLS(nuevoCarrito);
    renderBotonCarrito();
    renderCarrito();
}

const incrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
        guardarCarritoLS(carrito);
        renderCarrito();
        renderBotonCarrito();
    
}

const decrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
    if(producto.cantidad > 1){
        producto.cantidad -= 1;
        guardarCarritoLS(carrito);
        renderCarrito();
        renderBotonCarrito();
    }else{
        eliminarProductoCarrito(id);
    }
}

const buscarProducto = (id) => {
    const productos = cargarProductosLS();
    let producto = productos.find(item => item.id === id);
    return producto;
}


const estaEnElCarrito = (id) =>{
    const productos = cargarCarritoLS();
    return productos.some(item => item.id === id);
}

const cantProductosCarrito = () =>{
    const carrito = cargarCarritoLS();
    return carrito.reduce((acomulador,item) => acomulador += item.cantidad,0);
}

const sumaProductosCarrito = () =>{
    const carrito = cargarCarritoLS();
    return carrito.reduce((acomulador,item) => acomulador += item.precio * item.cantidad,0);
}

const renderBotonCarrito = () =>{
   let totalCarrito =  document.getElementById("totalCarrito");
   totalCarrito.innerHTML = cantProductosCarrito();
}

