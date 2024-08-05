import jwt from "jsonwebtoken"
import { environment } from "../config/config.js"

export const generateToken = (userId) => {
    return jwt.sign({ userId }, environment.jwt.SECRET, { expiresIn: "1h" })
}

export const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, environment.jwt.SECRET)
        return decoded
    } catch (error) {
        return null
    }
}