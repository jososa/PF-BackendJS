import { productService } from "../dao/services/products.service.js"
import MailingService from "../dao/services/mail.service.js"
import { userService } from "../dao/services/users.service.js"

export default class ProductController {

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts(req.query)
            res.status(200).send({ status: "success", payload: products })
          } catch (error) {
            req.logger.error("Error al obtener produtos", error)
            res.status(500).send({ status: "error", error: error.message })
          }
      }

    addProduct = async (req, res) => {
      const newProduct = req.body

      const user = req.session.user

      if(user.role !== "premium"){
        req.logger.error(`El usuario ${user.email} no tiene permisos para crear productos`)
        res.status(403).send({error: "No tiene permisos para realizar esta operacion"})
        return
      }

      try {
        let prod = [
          "title",
          "description",
          "price",
          "code",
          "stock",
          "thumbnail",
          "status"]

        let newprod = Object.keys(req.body)
        let valid = newprod.every((prop) => prod.includes(prop))
  
        const hasAllRequiredProps = prod.every((prop) =>
            newprod.includes(prop) &&
            newProduct[prop] !== undefined &&
            newProduct[prop] !== null)

        if (!hasAllRequiredProps) {
          req.logger.warning("Faltan campos para crear el producto")
          return res.status(400).json({
            error:
              "Debes agregar todos los campos requeridos para crear un nuevo producto",
            detalle: prod,
          });
        }
  
        if (!hasAllRequiredProps) {
          res.setHeader("Content-Type", "application/json")
          return res.status(400).json({
            error: `You have entered invalid properties`,
            detalle: prod,
          })
        }
        await productService.addProducts(newProduct)
        req.logger.info("Producto creado correctamente", newProduct)
        res.status(201).json({ status: "success", newProduct })
      } catch (error) {
        res.status(400).json({ error: error.message })
      }

    }

    getProducts = async () => {
        try {
            let result = await productsModel.find().lean()
            return result
        } catch (error) {
          req.logger.error(error)
        }
    }

    getProductById = async (req, res) => {
        const { pid } = req.params
        try {
          const product = await productService.getProductById(pid)
          if (!product) {
            req.logger.error("Product not found")
            return res
              .status(400)
              .send({ status: "error", error: "Product not found" })
          }
          res.status(200).send({ status: "success", payload: product })
        } catch (error) {
          req.logger.error(error)
          res.status(500).send({ status: "error", error: error.message })
        }
    }

    async deleteProduct(req, res) {
      const productId = req.params.pid
      let owner
      try {
        const user = req.session.user
        const product = await productService.getProductById(productId)
  
        if (product.owner !== "adminCoder@coder.com") {
          owner = await userService.findUserByEmail(product.owner)
        }
  
        const isOwner = user.role === "admin" || user.email === owner.email
        if (!isOwner) {
          req.logger.error(
            `El usuario ${user.email} no tiene permisos para eliminar un producto`
          )
          res.status(403).send({ error: "No tienes permisos para realizar esta operación" })
          return
        }
  
        if (user.role !== "admin" && owner.role === "premium") {
          const mailer = new MailingService()
          await mailer.sendMail({
            from: "E-commerce Admin",
            to: owner.email,
            subject: `Hemos eliminado tu producto ${product.title}`,
            html: `<div><h1>¡Se ha eliminado un producto!</h1>
                    <h2>Detalle</h2>
                      <ul>
                        <li>Título: ${product.title}</li>
                        <li>Código: ${product.code}</li>
                        <li>Descripción: ${product.description}</li>
                        <li>Precio: ${product.price}</li>
                      </ul>
                    </div>`,
          })
        }
  
        await productService.deleteProduct(productId)
        req.logger.debug("Producto eliminado correctamente")
        res.status(200).json({ status: "success" })
      } catch (error) {
        req.logger.error("El producto no se pudo eliminar", error)
        res.status(400).json({ error: error.message })
      }
    }

    updateProduct = async (req, res) => {
        const productId = req.params.prodId
        const updatedFields = req.body
        try {
          const updatedProduct = await productService.updateProduct(
            productId,
            updatedFields
          );
          req.logger.debug("Producto actualizado", updatedProduct)
          res.json({ status: "Producto actualizado", updatedProduct })
        } catch (error) {
          req.logger.error("Error al actualizar producto", error)
          res.status(400).json({ error: error.message })
        }
    }

}

export const productController = new ProductController() 