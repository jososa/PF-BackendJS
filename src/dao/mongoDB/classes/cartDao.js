import { validateCart } from "../../../utils/cartError.js"
import { CustomError } from "../../../utils/customError.js"
import { errorTypes } from "../../../utils/errorTypes.js"
import { logger } from "../../../utils/Logger.js"
import cartsModel from "../models/cartsModel.js"

export default class CartDao {

  getOrCreateCart = async () => {
    let cart = await cartsModel.findOne().lean()
    if (!cart) {
      cart = await this.createCart()
    }
    return cart
  }

  getCarts = async () => {
      try {
          const carts = await cartsModel.find().lean();
          return carts
      } catch (error) {
        logger.error(error)
      }
  }

  getCartById = async (cartId) => {
      try {
          const cartById = await cartsModel.findById(cartId).populate("products.product").lean()
          return(cartById)
      } catch (error) {
        logger.error(error)
      }
  }

  createCart = async (products) => {
      try {
          let cartData = {};
          if (products && products.length > 0) {
              cartData.products = products
          }

          const cart = await cartsModel.create(cartData)
          return cart
      } catch (error) {
        logger.error(error)
      }
  }

  addProductsToCart = async (cartId, productId, quantity) => {
    if (quantity || typeof quantity === "number" || quantity > 0) {
      const cart = await cartsModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === productId.toString()
      )
      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity });
      } else {
        throw new Error("Producto ya existente en el carrito");
      }
      return await cart.save();
    } else {
      throw CustomError.CustomError(
        "Datos incompletos",
        "Cantidad faltante o no válida en la solicitud",
        errorTypes.ERROR_INVALID_ARGUMENTS,
        validateCart(quantity)
      )
    }
  }
    
  updateProductsInCart = async (cid, products) => {
      try {
          return await cartsModel.findOneAndUpdate(
              { _id: cid },
              { products },
              { new: true })

      } catch (error) {
          throw error
      }
  }

  updateProductQuantity = async (cartId, productId, quantity) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado")
      }
      const productIndex = cart.products.findIndex(
        (item) => item.product._id.toString() === productId.toString()
      )
      if (productIndex === -1) {
        throw new Error("El producto no existe en el carrito")
      }
      cart.products[productIndex].quantity += quantity
      await cart.save()
      return cart
    } catch (error) {
      throw error
    }
  }

  updateOneProduct = async (cid, products) => {
      
      await cartsModel.updateOne(
          { _id: cid },
          {products})
      return await cartsModel.findOne({ _id: cid })
  }

  removeProductFromCart = async (cid, pid) => {
      const cart = await cartsModel.findById(cid)
      cart.products = cart.products.filter((product) => product._id.toString() !== pid)
      return cart.save()
    }

  clearCart = async (cid) => {
  const cart = await cartsModel.findById(cid)
      if (!cart) {
        throw new Error("El carrito no existe")
      }
      cart.products = []
      return cart.save()
  }

}
