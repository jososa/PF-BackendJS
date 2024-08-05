document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".btn-delete")
    const deleteManyUsersButton = document.getElementById("btn-delete-users")
  
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const userId = button.getAttribute("data-id")
  
        try {
          const response = await fetch(`api/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
  
          if (response.ok) {
            alert("Usuario eliminado correctamente")
            window.location.reload()
          } else {
            const result = await response.json()
            alert(`Error: ${result.message}`)
          }
        } catch (error) {
          console.error("Error al eliminar el usuario:", error)
          alert("Ocurrió un error al eliminar el usuario")
        }
      })
    })
  
    deleteManyUsersButton.addEventListener("click", async () => {
      try {
        const response = await fetch(`api/users`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        if (response.ok) {
          const result = await response.json();
          alert(
            `Usuarios inactivos eliminados correctamente: ${result.deletedCount}`
          )
          window.location.reload()
        } else {
          const result = await response.json()
          alert(`Error: ${result.message}`)
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error)
        alert("Ocurrió un error al eliminar el usuario")
      }
    })
  })  