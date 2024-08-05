import { messageRepository } from "../repositories/index.js"

class MessageService {
    
    getMessages = async () => {
        try {
            return await messageRepository.getMessages()
        } catch (error) {
            return error
        }
    }

    createMessage = async (msg) => {
        try {
            return await messageRepository.createMessage(msg)   
        } catch (error) {
            return error
        }
    }
}

export const messageService = new MessageService()