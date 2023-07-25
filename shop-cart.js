
//Recuperación de información en LocalStorage
if (JSON.parse(localStorage.getItem('carrito'))){
    carrito = JSON.parse(localStorage.getItem('carrito'))
}
else{
    carrito = []
}
productos = JSON.parse(localStorage.getItem('productos')) 

let total = 0

//Función para renderizar los productos agregados al carrito
function mostrarCarrito (arrayCarrito){
    if (arrayCarrito.length === 0) {
        let contenedorCarrito = document.getElementById("contenedorCarrito")
        contenedorCarrito.classList.add("text-center")
        contenedorCarrito.innerHTML = '<h2>No hay productos agregados al carrito</h2>'
    }
    else {
        let contenedorCarrito = document.getElementById("contenedorCarrito")
        contenedorCarrito.innerHTML = ''
        contenedorCarrito.classList.add("m-3")
        let divRow = document.createElement("div")
        divRow.classList.add("row", "container-fluid", "row-cols-3", "row-cols-md-5", "row-cols-lg-6", "g-1", "justify-content-center")
    
        arrayCarrito.forEach((producto) => {
            nombre = producto.nombre.charAt(0).toUpperCase() + producto.nombre.slice(1)
            let divCard = document.createElement("div")
            divCard.classList.add("mb-1", "justify-content-center")
            let divCardBody = document.createElement("div")
            divCardBody.classList.add("card", "p-1")
            divCardBody.style.width = "100%"
            divCardBody.style.height = "100%"
            divCardBody.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" style="width: 100%; height: 100%; object-fit: contain;" alt="">
            <div class="card-body">
            <h8 class="card-title">${nombre}</h8>
            <p class="card-text">Total: $${producto.precio}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
            <button class="btn" id=${producto.id}>Eliminar del Carrito</button>
            </div>
        `
    
        divCard.appendChild(divCardBody)
        divRow.appendChild(divCard)
        contenedorCarrito.appendChild(divRow)
    
        let botonEliminar = document.getElementById(producto.id)
        botonEliminar.addEventListener("click", (event) => {eliminarDelCarrito(event.target.id)})
        })
        let productosEnCarrito = document.getElementById("productosEnCarrito")
        let div = document.createElement("div")
        div.textContent = carrito.length
        productosEnCarrito.appendChild(div)     
    }
}

//Función para eliminar producto seleccionado del carrito
function eliminarDelCarrito(id) {

    let productoAEliminar = productos.find(producto => producto.id == id)
    let indexProductos = productos.indexOf(productoAEliminar)

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: `¿Está seguro?`,
        text: `¿Desea eliminar ${productoAEliminar.nombre} del carrito?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        focusConfirm: false,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

            carrito = carrito.filter(producto => producto.id != id)
            productos[indexProductos].stock += 1
            localStorage.setItem('carrito', JSON.stringify(carrito))
            localStorage.setItem('productos', JSON.stringify(productos))
            if (carrito.length <= 0){
                carrito = []
                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    'Vaciaste el carrito',
                    'success'
                ).then((result) => {
                    location.reload()
                })
            }
            else{
                swalWithBootstrapButtons.fire(
                    'Eliminado!',
                    `Se eliminó ${productoAEliminar.nombre} del carrito`,
                    'success'
                )
                mostrarCarrito(carrito)
                renderizarTotal()
            }

        } else if ( result.dismiss === Swal.DismissReason.cancel) {
            mostrarCarrito(carrito)
            renderizarTotal()
        }
      })
}

//Función para eliminar todos los productos del carrito
function vaciarCarrito() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¿Seguro que desea vaciar el carrito?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
      focusConfirm: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '¡Carrito vacio!',
          'Vaciaste el carrito de compras',
          'success'
        ).then(() => {
          carrito = []
          total = 0
          localStorage.removeItem('carrito')
          localStorage.removeItem('productos')
          location.reload()
        })
      } else if ( result.dismiss === Swal.DismissReason.cancel ) {
      }
    })
}

function confirmarCompra (){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Desea completar su compra?',
        text: `El total a pagar es de $${calcularTotal()}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar!',
        cancelButtonText: 'Seguir comprando!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            '¡Compra Exitosa!',
            'Gracias por su compra',
            'success'
          ).then((result) => {
            carrito = []
            total = 0
            localStorage.removeItem('carrito')
            localStorage.removeItem('productos')
            location.reload()
          })
        }
      })
}

//Función para calcular el total a pagar por los productos agregados al carrito
function calcularTotal() {
    total = 0
    carrito.forEach(producto => total += producto.precio)
    return total
}

//Función para mostrar el Total a pagar y los botones de confirmar compra o vaciar carrito
function renderizarTotal() {
    let totalizarCompra = document.getElementById("totalizarCompra")
    totalizarCompra.innerHTML = ''
    let div = document.createElement("div")
    div.classList.add("justify-content-center", "contenedorTotal")
    div.innerHTML = `
    <div id="contenedorTotal" class="card text-center container mb-5">
        <div class="card-header textoColorBold">
            <h4>Total a Pagar</h4>
        </div>
        <div class="card-body textoColorBold">
            <h3 class="card-title">$${calcularTotal().toFixed(2)}</h3>
        </div>
        <div class="card-footer justify-content-between d-flex">
            <button id="botonVaciar" class="btn btn-danger mx-2">Vaciar Carrito</button>
            <button id="botonConfirmar" class="btn btn-success mx-2">Confirmar</button>
        </div>
    </div>
    `
    totalizarCompra.innerHTML = div.innerHTML
    let botonVaciar = document.getElementById("botonVaciar")
    botonVaciar.addEventListener("click", () => {
        vaciarCarrito()
    })
    let botonConfirmar = document.getElementById("botonConfirmar")
    botonConfirmar.addEventListener("click", confirmarCompra)
}

//Llamada a función para mostrar los productos agregados al carrito
mostrarCarrito(carrito)

//Operador AND para renderizar el contenedor de totalización de compra en caso de que haya productos en el carrito
carrito.length > 0 && renderizarTotal()