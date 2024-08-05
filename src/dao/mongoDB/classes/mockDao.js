import { createProduct } from "../../../utils/faker.js"

export default class MockDao {

    getProducts(){
        let products = []

        for(let i=0; i < 100; i++){
            products.push(createProduct())
        }
        return products
    }

}