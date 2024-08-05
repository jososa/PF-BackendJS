import mongoose, { Schema } from "mongoose"

const collectionMessages = "messages"

const schemaMessages = new Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

const messagesModel = mongoose.model(collectionMessages,schemaMessages)

export default messagesModel