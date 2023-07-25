
//Arreglo con productos para prueba
let productos = []

//Arreglo para almacenar productos de carrito
let carrito = []

//Función asíncrona para obtener los productos del JSON
async function obtenerProductos() {
  try {
    let respuesta = await fetch("./bd.json")
    let productosJSON = await respuesta.json()
    return productosJSON.productos
  } catch (error) {
    console.error('Error al obtener los productos: ', error)
    throw error
  }
}

//Llamada a función asíncrona para obtener los productos del JSON	
obtenerProductos()
  .then((productosJSON) => {
    productos = productosJSON
    obtenerLocalStorage()
    mostrarProductos(productos)
  }) //Luego de obtener la respuesta, se llama a la función mostrarProductos
  .catch((error) => {
    console.error('Error al obtener los productos: ', error)
  })

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
   
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Agregaste otro(a) "${producto.nombre}" al carrito`,
        showConfirmButton: false,
        timer: 1500
      })
  } 
  else {
          let productoCarrito = {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
      }

      carrito.push(productoCarrito)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Agregaste "${producto.nombre}" al carrito`,
        showConfirmButton: false,
        timer: 1500
      })
  }

  localStorage.setItem("carrito", JSON.stringify(carrito))
  localStorage.setItem("productos", JSON.stringify(productos))
  mostrarProductos(productos)
}

//Función para obtener datos almacenados en Local Storage
function obtenerLocalStorage(){
  let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
  let productosStorage = JSON.parse(localStorage.getItem("productos"))
 
  carrito = carritoStorage ? carritoStorage : []
  
  productos = productosStorage ? productosStorage : productos
}

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