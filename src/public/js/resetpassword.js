const form = document.getElementById("restorePassForm")
const passwordInput = document.getElementById("passwordRestore")
const userId = document.getElementById("restoreUserId")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  console.log(passwordInput.value);
  fetch(`/api/sessions/restorepass/${userId.value}`, {
    method: "POST",
    body: JSON.stringify({
      password: passwordInput.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status === 200) {
      window.location.replace("/login")
    } else {
      window.location.replace("/restore")
      console.error("Algo salio mal")
    }
  })
})
