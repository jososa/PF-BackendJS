//import messageModel from "../../models/messagesModel.js"
import { messageService } from "../dao/services/message.service.js"

export default class MessageManager{

    getMessages = async (req, res) => {
        try {
            const msg = await messageService.getMessages()
            req.logger.debug("Listado de mensajes", msg)
            res.json(msg)
        } catch (error) {
            res.status(500).json({ error: error.message })
            req.logger.error("Error al obtener mensajes", error)
        }
    }

    createMessage = async (req, res) => {
        const msg = req.body
        try {
            await messageService.createMessage(msg)
            req.logger.debug_("Mensaje creado", msg)
            res.json({ status: "succes" })
        } catch (error) {
            req.logger.error("Error al crear mensaje", error)
            res.status(500).json({ error: error.message })
        }
    }

    // getMessages = async () => {
    //     try {
    //         return await messageModel.find()
    //     } catch (error) {
    //         return error
    //     }
    // }

    // createMessage = async (msg) => {
    //     if(msg.user.trim() === '' || msg.message.trim() === ''){
    //         return null
    //     }
    //     try {
    //         return await messageModel.create(msg)
    //     } catch (error) {
    //         return error
    //     }
    // }

}