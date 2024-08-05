import { Router } from "express"
import { mockController } from "../controllers/mockController.js"

const mockRouter = Router()

mockRouter.get("/", mockController.createProduct)

export default mockRouter