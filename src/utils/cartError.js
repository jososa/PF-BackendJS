export const validateCart = (quantity) => {
    if (!quantity || typeof quantity !== "number" || quantity <= 0) {
      return `Error agregando producto al carrito.
        Expected arguments:
        - quantity: of type ${typeof quantity} - ${quantity} was received `;
    }
  }
  