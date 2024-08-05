import mongoose from "mongoose"
import { environment } from "./config.js"
import { logger } from "../utils/Logger.js"

const connectionString = environment.mongoUrl

const connectMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        logger.info('Conectado a mongoDB')
    } catch (error) {
        logger.error("Ocurrió un error al conectarse a mongoDB", error)
        process.exit()
    }
}

export default connectMongoDB