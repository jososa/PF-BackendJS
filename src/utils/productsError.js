export const validateProduct = (product) => {
    const { title, description, price, code, stock, thumbnail } = product
  
    return `Error al crear producto.
    Expected arguments:
    - title: of type String - ${title} was received
    - description: of type String - ${description} was received
    - price: of type Number - ${price} was received
    - stock: of type Number - ${stock} was received
    - code: of type String - ${code} was received
    - thumbnail: of type String - ${thumbnail} was received`
  }