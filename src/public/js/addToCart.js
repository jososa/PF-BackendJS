const addToCart = document.querySelectorAll(".addToCart")

addToCart.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const productId = e.target.dataset.id
    const quantityInput = document.querySelector(
      `.quantityInput[data-id="${productId}"]`
    )
    const quantity = parseInt(quantityInput.value, 10)

    try {
      let cartId = localStorage.getItem("cart_id")

      if (!cartId) {
        const response = await fetch("/api/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.status !== 201) {
          throw new Error("Error al crear carrito")
        }

        const data = await response.json();
        cartId = data.cart._id;
        localStorage.setItem("cart_id", cartId)
      }

      const cartResponse = await fetch(`/api/carts/${cartId}`)
      const cartData = await cartResponse.json()
      const productExists = cartData.some(
        (item) => item.product._id === productId
      )
      const method = productExists ? "PUT" : "POST"
      const endpoint = `/api/carts/${cartId}/products/${productId}`
      const response = await fetch(endpoint, {
        method: method,
        body: JSON.stringify({ quantity: quantity }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        throw new Error("Error al actualizar carrito")
      }
      const data = await response.json();
      alert("Producto agregado al carrito correctamente")
      return data;
    } catch (error) {
      console.error("Error:", error)
    }
  })
})