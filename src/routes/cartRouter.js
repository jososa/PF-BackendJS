import { Router } from "express"
import { cartController } from "../controllers/cartController.js"
import { authorization } from "../middlewares/auth.js"
import { ticketsController } from "../controllers/ticketController.js"

const cartRouter = Router()

//Alta de carrito
cartRouter.post("/", cartController.createCart)

//Obtener carritos
cartRouter.get("/", cartController.getCarts)

//Obtener carrito por ID
cartRouter.get("/:cid", cartController.getCartById)

//Agregar producto al carrito
cartRouter.post("/:cid/products/:pid", authorization(["usuario", "premium"]), cartController.addProductsToCart)

//Modificar carrito
cartRouter.put('/:cid', cartController.updateProductsInCart)

//Actualiza la cantidad de un producto específico en el carrito
cartRouter.put('/:cid/products/:pid', cartController.updateProductQuantity)

//Eliminar producto del carrito
cartRouter.delete('/:cid/products/:pid', cartController.removeProductFromCart)

//Eliminar carrito
cartRouter.delete('/:cid', cartController.clearCart)

//Crear ticket de compra
cartRouter.post("/:cid/purchase", ticketsController.createTicket)

export default cartRouter