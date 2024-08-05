export default class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    getAllProducts = async (params) => {
        try {
            return this.dao.getAllProducts(params)
        } catch (error) {
            return error
        }
    }

    getProducts = async () => {
        try {
            return this.dao.getProducts()
        } catch (error) {
            return error   
        }
      }
    
      getProductsById = async (id) => {
        try {
            return this.dao.getProductsById(id)   
        } catch (error) {
            return error
        }
      }
    
      addProducts = async (product) => {
        try {
            return this.dao.addProducts(product)   
        } catch (error) {
            return error
        }
      }
    
      updateProduct = async (id, updatedFields) => {
        try {
            return this.dao.updateProduct(id, updatedFields)   
        } catch (error) {
            return error
        }
      }
    
      deleteProduct = async (id) => {
        try {
            return this.dao.deleteProduct(id)   
        } catch (error) {
            return error
        }
      }
}