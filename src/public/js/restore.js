const form = document.getElementById("restoreForm")
const emailInput = document.getElementById("emailInput")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  fetch("/api/sessions/restore", {
    method: "POST",
    body: JSON.stringify({
      email: emailInput.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      window.location.replace("/")
    } else {
      console.error("Algo salio mal")
    }
  })
})