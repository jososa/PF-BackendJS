//import productsService from "../../services/products.service.js"
import { productsModel } from "../models/productsModel.js"
import { CustomError } from "../../../utils/customError.js"
import { validateProduct } from "../../../utils/productsError.js"
import { errorTypes } from "../../../utils/errorTypes.js"

export  default class ProductDao {

  getAllProducts = async(params) => {
      const {
        limit = 10, // default limit = 10
        page = 1, // default page = 1
        sort = null,
        query = null,
        category = null,
        status = null, //available
      } = params

      const options = {
        query: query,
        page: Number(page),
        limit: Number(limit),
        lean: true,
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
        customLabels: {
          docs: "products",
          totalDocs: "totalProducts",
        },
      }

      let searchQuery = {};

      // $options: 'i' en MongoDB se utiliza para hacer que la búsqueda sea insensible a mayúsculas y minúsculas.
      if (query) {
        searchQuery.title = { $regex: query, $options: "i" }
      }

      if (category) {
        searchQuery.category = { $regex: category, $options: "i" }
      }

      if (status !== null) {
        searchQuery.status = status === "true"
      }

      const result = await productsModel.paginate(searchQuery, options)
      return result
  }

  addProduct = async (newProduct) => {
      try {
        if (newProduct.title &&
            newProduct.description &&
            newProduct.price &&
            newProduct.code &&
            newProduct.stock
        ){
          if(!newProduct.owner){
                newProduct.owner = "admin"
          }
            newProduct.status = newProduct.status || true
            return await productsModel.create(newProduct)
        } else{
            throw CustomError.CustomError("Datos incompletos",
                                          "Ingrese todos los datos",
                                          errorTypes.ERROR_INVALID_ARGUMENTS,
                                          validateProduct(newProduct))
        }
      } catch (error) {
        logger.error(error)
      }
  }

  getProducts = async () => {
      try {
          let result = await productsModel.find().lean()
          return result
      } catch (error) {
        logger.error(error)
      }
  }

  getProductById = async (productId) => {
      try {
          return await productsModel.findById(productId)
      } catch (error) {
        logger.error(error)
      }
  }

  deleteProduct = async (productId) => {
      try {
          return await productsModel.findByIdAndDelete(productId)
      } catch (error) {
        logger.error(error)
      }
  }

  updateProduct = async (pid, campo) => {
      try {
          return await productsModel.findByIdAndUpdate(pid, {$set: campo})
      } catch (error) {
        logger.error(error)
      }
  }

}
