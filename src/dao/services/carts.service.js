import { cartRepository } from "../repositories/index.js"

class CartService {

    getCarts = async () => {
        try {
            return await cartRepository.getCarts()
        } catch (error) {
            return error
        }
    }

    createCart = async () => {
        try {
            return await cartRepository.createCart()
        } catch (error) {
            return error
        }
    }

    getCartById = async (cartId) => {
        try {
            return await cartRepository.getCartById(cartId)
        } catch (error) {
            return error
        }
    }

    addProductsToCart = async (cartId, productId, quantity) => {
        try {
            return await cartRepository.addProductsToCart(cartId, productId, quantity)
        } catch (error) {
            return error
        }
    }

    updateProductsInCart = async (cid, products) => {
        try {
            return await cartRepository.updateProductsInCart(cid, products)
        } catch (error) {
            return error
        }
    }

    updateProductQuantity = async (cartId, productId, quantity) => {
        try {
            return await cartRepository.updateProductsInCart(cartId, productId, quantity)
        } catch (error) {
            return error
        }
    }

    removeProductFromCart = async (cid, pid) => {
        try {
            return await cartRepository.removeProductFromCart(cid, pid)
        } catch (error) {
            return error
        }
    }

    clearCart = async (cid) => {
        try {
            return await cartRepository.clearCart(cid)
        } catch (error) {
            return error
        }
    }

    getProductsByCartId = async (cid) => {
        try {
            return await cartRepository.getProductsByCartId(cid)
        } catch (error) {
            return error
        }
      }

}

export const cartService = new CartService()