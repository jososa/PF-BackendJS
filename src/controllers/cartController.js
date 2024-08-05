import { cartService } from "../dao/services/carts.service.js"
//import cartsRepositories from "../../repositories/cartsRepositories.js"
import { productService } from "../dao/services/products.service.js"

export default class CartController {

    getCarts = async (req,res) => {
      const cart = await cartService.getCarts()
      try {
        res.json({cart})
      } catch (error) {
        req.logger.error("Error al obtener carrito", error)
        res.status(500).json({ error: error.message })
      }
    }

    getCartById = async (req, res) => {
      try {
        const cid = req.params.cid
        const cart = await cartService.getCartById(cid)
        res.json(cart)
      } catch (error) {
        req.logger.error("Error al obtener carrito", error)
          res.status(500).send({ status: "Internal Server Error",  error: error.message})
      }
    }

    createCart = async (req, res) => {
      try {
        const newCart = await cartService.createCart()
        req.logger.debug("Carrito creado", newCart)
        res.status(201).json({ status: "Carrito creado", payload: newCart })
      } catch (error) {
          console.log(error)
          req.logger.error("Error al crear carrito", error)
          res.status(500).send({ status: "Error al crear carrito",  error: error.message })
      }
    }

    async addProductsToCart(req, res) {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const user = req.session.user

        const prod = await productService.getProductById(pid)
        if(prod.owner === user.email){
          req.logger.error("El usuario es el dueño del producto")
          res.status(403).send({error: "El usuario es el dueño del producto"})
          return
        }
        try {
          const updatedCart = await cartService.addProductsToCart(cid, pid, quantity)
          req.logger.debug("Productos agregados al carrito", updatedCart)
          res.status(201).send({ status: "success", payload: updatedCart })
        } catch (error) {
          req.logger.error("Error al agregar productos al carrito",error)
            res.status(500).send({ status: "error",  error: error.message })
        }
      }
      
    updateProductsInCart = async (req, res) => {
        try {
          const cid = req.params.cid
          const {products} = req.body
      
          const result = await cartService.updateProductsInCart(cid, products)
      
          res.status(200).send({ status: "Carrito actualizado con exito" })
          req.logger.debug("Carrito actualizado con exito", result)
      } catch (error) {
        req.logger.error("Error al actualizar carrito", error)
      }
    }

    async updateProductQuantity(req, res) {
      const { cid, pid } = req.params
      const { quantity } = req.body
      try {
          const updatedCart = await cartService.updateProductQuantity(cid, pid, quantity)
          req.logger.debug("Carrito actualizado", updatedCart)
          res.status(200).send({ status: "success", payload: updatedCart })
      } catch (error) {
          req.logger.error("Error al actualizar carrito", error)
          res.status(500).send({ status: "error",  error: error.message })
      }
    }

    removeProductFromCart = async (req, res) => {
        const { cid, pid } = req.params
        try {
            await cartService.removeProductFromCart(cid, pid)
            res.status(200).send({ status: "success", message: `Se elimino producto ID: ${pid} del carrito` })
        } catch (error) {
          req.logger.error("Error al eliminar producto del carrito", error)
            res.status(500).send({ status: "error",  error: error.message })
        }
      }

    clearCart = async (req, res) => {
      const { cid } = req.params
      try {
          await cartService.clearCart(cid)
          res.status(204).send({ status: "success", message: `Carrito ID: ${cid} eliminado con exito`, payload: null })
      } catch (error) {
          req.logger.error("Error al eliminar carrito", error)
          res.status(500).send({ status: "error",  error: error.message })
      }
    }

    async getProductsByCartId(req, res) {
      const cid = req.params.cid
      const cart = await cartService.getProductsByCartId(cid)
      req.logger.debug("Lista de productos en carrito", cart)
      try {
        res.json(cart.products)
      } catch (error) {
        req.logger.error("Error al obtener productos del carrito",error)
        res.status(500).json({ error: error.message })
      }
    }

}

export const cartController = new CartController()