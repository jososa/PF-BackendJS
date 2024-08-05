const logoutBtn = document.getElementById("logoutBtn")
const goIndex = document.getElementById("goIndex")
const cartBtn = document.getElementById("cartBtn")

document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname

  if (pathname === "/register" || pathname === "/login") {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (cartBtn) cartBtn.style.display = "none";
  }

  if (pathname === "/register" || pathname === "/login" || pathname === "/") {
    if (goIndex) goIndex.style.display = "none"
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      fetch("/api/sessions/logout").then((response) => {
        if (response.status === 200) {
          window.location.replace("/login")
        }
      })
    })
  }
})

cartBtn.addEventListener("click", () => {
  const cartId = localStorage.getItem("cart_id");
  if (!cartId) {
    alert("Aún no has agregado productos al carrito")
  } else {
    window.location.replace(`/carts/${cartId}`)
  }
})