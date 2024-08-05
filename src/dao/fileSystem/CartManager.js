import * as fs from "fs"
import rootDir from "../../utils/utils.js"
import ProductManager from './ProductManager.js'
import { logger } from "../../utils/Logger.js"

const productsAll = new ProductManager()

export class CartManager {

    constructor() {
        this.path = `${rootDir}/data/Cart.json`
    }

    readCarts= async () => {
        let carts = await fs.promises.readFile(this.path, 'utf-8')
        return JSON.parse(carts)
    };
    
    writeCarts = async (cart)=>{
        await fs.promises.writeFile(this.path,JSON.stringify(cart))
    }

    exist = async(id) => {
        const carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    createCart = async () => {
        try {
            const cartsOld = await this.readCarts();
            const id = cartsOld.length + 1
            const cartsConcat = [ {id : id, products : []}, ...cartsOld]
            await this.writeCarts(cartsConcat)
            return 'added Carts'
        } catch (error) {
            logger.error("Error al crear el carrito:", error)
            throw new Error("Error al crear el carrito", error)
        }

    }

    getCarts = async () => {
        let response = await fs.promises.readFile(this.path, "utf-8")
        let result=JSON.parse(response)
        return result
    }

    async getCartById(id) {
        const itemsJSON = await fs.promises.readFile(this.path, 'utf-8')
        const items = JSON.parse(itemsJSON);
    
        if (items.some(cart => cart.id === parseInt(id))) {
          return items.find(cart => cart.id === parseInt(id))
        }
        return {message: 'Carrito no encontrado'}
      }

    async addProductsToCart(cid, pid) {
        const quantity=1
        try {
            const data = await fs.promises.readFile( this.path, "utf-8")
    
            if (data.trim() === "") {
                logger.error("No hay Carritos cargados")
                throw new Error("No hay Carritos cargados")
            }
    
            const cartList = JSON.parse(data);
            const cartIndex = cartList.findIndex((cart) => cart.id === parseInt(cid))
    
            if (cartIndex === -1) {
                throw new Error(`No se encontró ningún carrito con el ID ${cid}`)
            }
    
            const productIndex = cartList[cartIndex].products.findIndex(
            (product) => product.product === pid
            )

            if(quantity < 1) {
                throw new Error(`La cantidad debe ser mayor a 0`)
            }
    
            if (productIndex == -1) {
                cartList[cartIndex].products.push({ product: pid, quantity })
            } else {
                cartList[cartIndex].products[productIndex].quantity += quantity
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(cartList, null, "\t")
            );
    
            return cartList[cartIndex]
            } catch (error) {
                logger.error(error)
                throw new Error(error.message)
            }
        }
    
}
export default CartManager