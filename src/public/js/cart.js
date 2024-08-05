const finalizarBtn = document.getElementById("finalizarBtn")
const deleteFromCart = document.querySelectorAll(".deleteFromCart")
const cartId = localStorage.getItem("cart_id")

finalizarBtn.addEventListener("click", () => {
  fetch(`/api/carts/${cartId}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("No se pudo generar el ticket")
      }
    })
    .then((data) => {
      const ticketId = data.payload._id
      fetch(`/api/carts/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(
              "Error al eliminar el carrito luego de generar el ticket"
            )
          }
        })
        .then((data) => {
          localStorage.removeItem("cart_id")
          window.location.replace(`/ticket/${ticketId}`)
        });
    })
    .catch((error) => {
      console.error(error)
    })
})

deleteFromCart.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    const productId = e.target.dataset.id
    fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Error al eliminar el producto del carrito")
        }
      })
      .then(() => {
        window.location.reload()
      })
  })
})