//Arreglo con productos para prueba
let productos = [
    { id: 1, nombre: "smartphone", precio: 299.99, categoria: "Electrónica", stock: 0, imagen:"https://www.muycomputer.com/wp-content/uploads/2022/05/smartphones.jpg" },
    { id: 2, nombre: "tablet", precio: 199.99, categoria: "Electrónica", stock: 10, imagen:"https://home.ripley.cl/store/Attachment/WOP/D113/2000383682167/2000383682167_2.jpg" },
    { id: 3, nombre: "smart tv", precio: 599.99, categoria: "Electrónica", stock: 5, imagen:"https://home.ripley.cl/store/Attachment/WOP/D171/2000390574134/2000390574134-1.jpg" },
    { id: 4, nombre: "auriculares", precio: 79.99, categoria: "Accesorios", stock: 20, imagen:"https://home.ripley.cl/store/Attachment/WOP/D347/2000392841821/2000392841821_2.jpg" },
    { id: 5, nombre: "mouse", precio: 19.99, categoria: "Accesorios", stock: 30, imagen:"https://cdn2.spider.cl/20243-large_default/mouse-inalambrico-trust-ozaa-bateria-recargable-6-botones-2400dpi-azul.jpg" },
    { id: 6, nombre: "teclado", precio: 39.99, categoria: "Accesorios", stock: 25, imagen:"https://cdnx.jumpseller.com/prismo-store/image/25984537/k3_iso_spanish_2.jpg?1682568900" },
    { id: 7, nombre: "laptop", precio: 899.99, categoria: "Computadoras", stock: 12, imagen:"https://consumer.huawei.com/content/dam/huawei-cbg-site/latam/mx/mkt/plp/laptops/d14-amd-2021.jpg" },
    { id: 8, nombre: "monitor", precio: 249.99, categoria: "Computadoras", stock: 18, imagen:"https://www.pcfactory.cl/public/foto/46125/2_1000.jpg?t=1664886183321" },
    { id: 9, nombre: "impresora", precio: 149.99, categoria: "Computadoras", stock: 8, imagen:"https://storage.googleapis.com/designtec-storage/impresora-multifuncional-epson-ecotank-l4260-4599.jpg" },
    { id: 10, nombre: "camara", precio: 299.99, categoria: "Fotografía", stock: 6, imagen:"https://home.ripley.cl/store/Attachment/WOP/D126/2000385326335/2000385326335_2.jpg" },
    { id: 11, nombre: "dron", precio: 499.99, categoria: "Fotografía", stock: 4, imagen:"https://s3.amazonaws.com/imagenes-sellers-mercado-ripley/2021/10/22000621/IMAGEN-1-MICRO-DBLANCO-MICRO-DRON-CON-CAMARA-HD-PLAN-DE-VUELO-GIRO-360o-RECARGABLE-8X9-CM-BLANCO1.jpg" },
    { id: 12, nombre: "altavoz", precio: 129.99, categoria: "Audio", stock: 15, imagen:"https://home.ripley.cl/store/Attachment/WOP/D103/2000384694374/2000384694374_2.jpg" },
    { id: 13, nombre: "reproductor de musica", precio: 49.99, categoria: "Audio", stock: 20, imagen:"https://home.ripley.cl/store/Attachment/WOP/D347/2000316208389/2000316208389_2.jpg" },
    { id: 14, nombre: "consola de videojuegos", precio: 399.99, categoria: "Videojuegos", stock: 7, imagen:"https://home.ripley.cl/store/Attachment/WOP/D172/2000380458314/2000380458314-2.jpg" },
    { id: 15, nombre: "controlador de videojuegos", precio: 59.99, categoria: "Videojuegos", stock: 25, imagen:"https://home.ripley.cl/store/Attachment/WOP/D172/2000395344565/2000395344565-7.jpg" },
    { id: 16, nombre: "smartwatch", precio: 199.99, categoria: "Wearables", stock: 10, imagen:"https://home.ripley.cl/store/Attachment/WOP/D126/2000379560356/2000379560356-1.jpg" },
    { id: 17, nombre: "rastreador gps", precio: 79.99, categoria: "Wearables", stock: 15, imagen:"https://mercado.ripleylabs.com/wp-content/uploads/2023/04/gps-corta.jpg" },
    { id: 18, nombre: "proyector", precio: 499.99, categoria: "Audiovisual", stock: 3, imagen:"https://home.ripley.cl/store/Attachment/WOP/D171/2000388753138/2000388753138_2.jpg" },
    { id: 19, nombre: "pantalla de proyección", precio: 99.99, categoria: "Audiovisual", stock: 5, imagen:"https://cdn.shopify.com/s/files/1/0949/6208/products/pantallas-de-proyeccion-frontal2_grande.jpg?v=1446835271" },
    { id: 20, nombre: "cargador portátil", precio: 29.99, categoria: "Accesorios", stock: 10, imagen:"https://catalogo.movistar.cl/pub/media/wysiwyg/caracteristica_equipo/gyrux_pbwhite_2.jpg" }
  ]

//Arreglo para almacenar productos de carrito
let carrito = []

//Función para renderizar todos los productos
function mostrarProductos(arrayProductos) {
  let contenedorProductos = document.getElementById("contenedorProductos")
  contenedorProductos.innerHTML = ''
  contenedorProductos.classList.add("m-3")
  let divRow = document.createElement("div")
  divRow.classList.add("row", "container-fluid", "row-cols-3", "row-cols-md-5", "row-cols-lg-6", "g-1", "justify-content-center")
    
  arrayProductos.forEach((producto) => {
      nombre = producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1)
      let divCard = document.createElement("div")
      divCard.classList.add("mb-1", "justify-content-center")
  
      let divCardBody = document.createElement("div")
      divCardBody.classList.add("card", "p-1")
      divCardBody.style.width = "100%"
      divCardBody.style.height = "100%"
  
      if (producto.stock < 10 && producto.stock > 0) {
        divCardBody.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top" style="width: 100%; height: 100%; object-fit: contain;" alt="">
        <div class="card-body">
          <h8 class="card-title">${nombre}</h8>
          <p class="card-text">$${producto.precio}</p>
          <p class="card-text">Stock: ${producto.stock}</p>
          <p class="text-danger pt-1" style="font-weight: bold;">¡Últimas unidades!</p>
          <button class="btn" id=${producto.id}>Agregar al carrito</button>
        </div>
      `

      divCard.appendChild(divCardBody)
      divRow.appendChild(divCard)

      } else if (producto.stock >= 10) {
        divCardBody.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top" style="width: 100%; height: 100%; object-fit: contain;" alt="">
        <div class="card-body">
          <h8 class="card-title">${nombre}</h8>
          <p class="card-text">$${producto.precio}</p>
          <p class="card-text">Stock: ${producto.stock}</p>
          <button class="btn" id=${producto.id}>Agregar al carrito</button>
        </div>
      `
  
      divCard.appendChild(divCardBody)
      divRow.appendChild(divCard)

      }
      else {
        divCardBody.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top" style="width: 100%; height: 100%; object-fit: contain;" alt="">
        <div class="card-body">
          <h8 class="card-title">${nombre}</h8>
          <p class="card-text">$${producto.precio}</p>
          <p class="card-text text-danger fw-bold">Sin Stock</p>
          <button class="btn disabled text-dark" id=${producto.id}>Agregar al carrito</button>
        </div>
      `
  
      divCard.appendChild(divCardBody)
      divRow.appendChild(divCard)
      }

      contenedorProductos.appendChild(divRow)
      let botonAgregarCarrito = document.getElementById(producto.id)
      botonAgregarCarrito.addEventListener("click", (event) => agregarAlCarrito(event.target.id))
    })

    if (carrito.length > 0) {
      let productosEnCarrito = document.getElementById("productosEnCarrito")
      let div = document.createElement("div")
      div.textContent = carrito.length
      productosEnCarrito.appendChild(div)
      }
}

//Función para filtrar por dato ingresado por el usuario en input
function filtrarBuscadorInput(arrayProductos, busqueda) {
  busqueda = busqueda.toLowerCase()
  let productosFiltrados = []
  productosFiltrados = arrayProductos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda))

  if (productosFiltrados.length == 0) {
    let contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = ''
    contenedorProductos.innerHTML = `
    <h1 class="mt-5">No se encontraron resultados</h1>
    `
  } else {
    mostrarProductos(productosFiltrados)
  }
}

//Función para filtrar por selector de categorias
function filtrarBotonCategoria(arrayProdutos, categoria) {
    let productosFiltrados = arrayProdutos.filter((producto) => producto.categoria.toLowerCase() == categoria.toLowerCase())
    mostrarProductos(productosFiltrados)
}

function agregarAlCarrito(id){
  id = parseInt(id)
  let pos = productos.findIndex(producto => producto.id === id)
  let producto = productos.find(producto => producto.id === id)
  productos[pos].stock -= 1
  let carritoIndex = carrito.findIndex(item => item.id === id)

  if (carritoIndex !== (-1)) {
      carrito[carritoIndex].cantidad += 1
      carrito[carritoIndex].precio = productos[pos].precio * carrito[carritoIndex].cantidad
  } 
  else {
          let productoCarrito = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
      }

      carrito.push(productoCarrito);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito))
  localStorage.setItem("productos", JSON.stringify(productos))
  mostrarProductos(productos)
}

//Función para obtener datos almacenados en Local Storage
function obtenerLocalStorage(){
  let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
  let productosStorage = JSON.parse(localStorage.getItem("productos"))
  if (carritoStorage) {
    carrito = carritoStorage
  }
  if (productosStorage) {
    productos = productosStorage
  }
}

//Llamadas a funciones
obtenerLocalStorage()
mostrarProductos(productos)

//Variable para capturar evento click del botón para buscar un producto por nombre
let buscador = document.getElementById("buscador")
let botonBuscar = document.getElementById("botonBuscar")
botonBuscar.addEventListener("click", (event) => {
  event.preventDefault()
  filtrarBuscadorInput(productos, buscador.value)})

//Variables para capturar evento click de los botones de selección de categorias 
let botonElectronica = document.getElementById("Electrónica")
let botonAccesorios = document.getElementById("Accesorios")
let botonComputadoras = document.getElementById("Computadoras")
let botonFotografia = document.getElementById("Fotografías")
let botonAudio = document.getElementById("Audio")
let botonVideojuegos = document.getElementById("Videojuegos")
let botonWearables = document.getElementById("Wearables")
let botonAudiovisual = document.getElementById("Audiovisual")
let botonTodos = document.getElementById("Todos")
botonElectronica.addEventListener("click", () => filtrarBotonCategoria(productos, "Electrónica"))
botonAccesorios.addEventListener("click", () => filtrarBotonCategoria(productos, "Accesorios"))
botonComputadoras.addEventListener("click", () => filtrarBotonCategoria(productos, "Computadoras"))
botonFotografia.addEventListener("click", () => filtrarBotonCategoria(productos, "Fotografía"))
botonAudio.addEventListener("click", () => filtrarBotonCategoria(productos, "Audio"))
botonVideojuegos.addEventListener("click", () => filtrarBotonCategoria(productos, "Videojuegos"))
botonWearables.addEventListener("click", () => filtrarBotonCategoria(productos, "Wearables"))
botonAudiovisual.addEventListener("click", () => filtrarBotonCategoria(productos, "Audiovisual"))
botonTodos.addEventListener("click", () => mostrarProductos(productos))