import messagesModel from "../models/messagesModel.js"

export default class MessageDao{

    getMessages = async () => {
        try {
            return await messagesModel.find()
        } catch (error) {
            return error
        }
    }

    createMessage = async (msg) => {
        if(msg.user.trim() === '' || msg.message.trim() === ''){
            return null
        }
        try {
            return await messagesModel.create(msg)
        } catch (error) {
            return error
        }
    }

}