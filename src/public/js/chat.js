const socketClient=io()
const nombreUsuario=document.getElementById("nombreusuario")
const formulario=document.getElementById("formulario")
const inputmensaje=document.getElementById("mensaje")
const chat=document.getElementById("chat")

let usuario=null

if(!usuario){
    Swal.fire({
        title:"Web Chat Ecommerce",
        text:"Ingrese nombre de usuario",
        input:"text",
        inputValidator:(value)=>{
            if(!value){
                return "Ingrese nombre para continuar!"
            }
        }
    })
    .then(username=>{
        usuario=username.value
        nombreUsuario.innerHTML=usuario
        socketClient.emit("nuevousuario",usuario)
    })
}

formulario.onsubmit=(e)=>{
    e.preventDefault()
    const info={
        user:usuario,
        message:inputmensaje.value
    }
    socketClient.emit("mensaje",info)
    inputmensaje.value=" "
}

socketClient.on("chat", mensajes => {

    const chatRender = mensajes.map(mensaje => {
        return `<p class="message-container"><strong>${mensaje.user}</strong>: ${mensaje.message}</p>`
    }).join("");
    chat.innerHTML = chatRender
})