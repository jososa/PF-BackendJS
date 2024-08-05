import { logger } from "../../utils/Logger"

const socketClient = io()

socketClient.on("listaProductos", (obj)=>{
    logger.info("Conectado al servidor de WebSocket")
    refreshProducts(obj)
})

function refreshProducts(listProd){
    const divProd = document.getElementById('list-products')
    let prodHTML = ""

    listProd.forEach((product) =>{
        prodHTML += `

    <div class="col">
        <div class="card h-100">
          <img src="${product.thumbnail}" class="card-img-top img-fluid" alt="...">
          <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
            <p class="card-text">Descripcion: ${product.description}</p>
            <p class="card-text">Codigo: ${product.code}</p>
            <p class="card-text">Precio: $${product.price}</p>
            <p class="card-text">Stock: ${product.stock}</p>
            <p class="card-text">Status: ${product.status}</p>
            <p class="card-text">Categoria: ${product.category}</p>
          </div>
          <button type="submit" class="btn btn-primary" onclick="deleteProduct('${String(product._id)}')">Eliminar</button>
        </div>
    </div>
      `
    })

    divProd.innerHTML=prodHTML
}

function deleteProduct(productId){
    socketClient.emit("deleteProduct",productId)
}


let form = document.getElementById('product-form')
form.addEventListener("submit", (evt) =>{
    evt.preventDefault()

    let title = form.elements.title.value
    let description = form.elements.description.value
    let code = form.elements.code.value
    let price = form.elements.price.value
    let status = form.elements.status.checked
    let stock = form.elements.stock.value
    let category = form.elements.category.value
    let thumbnail = form.elements.thumbnail.value

    const newProduct = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: thumbnail
    }

    socketClient.emit("altaProducto", newProduct)

    form.reset()
})