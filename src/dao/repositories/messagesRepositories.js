export default class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    getMessages = async () => {
        try {
            return await this.dao.getMessages()
        } catch (error) {
            return error
        }
    }

    createMessage = async (msg) => {
        try {
            return await this.dao.createMessage(msg)
        } catch (error) {
            return error
        }
    }
}