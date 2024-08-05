import { Router } from "express"
import { productController } from '../controllers/productController.js'
import { authorization } from "../middlewares/auth.js"

const productsRouter = Router()

//Obtener productos
productsRouter.get("/", productController.getAllProducts)

//Obtener producto por ID
productsRouter.get("/:pid", productController.getProductById)

//Crear producto
productsRouter.post("/", authorization(["admin", "premium"]), productController.addProduct)

//Modificar producto
productsRouter.put("/:prodId", authorization("admin"), productController.updateProduct)

//Eliminar producto
productsRouter.delete("/:prodId",authorization(["admin", "premium"]), productController.deleteProduct)

export default productsRouter