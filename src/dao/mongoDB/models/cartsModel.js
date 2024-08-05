import mongoose, { Schema } from "mongoose"

const collectionCarts = "carts"

const schemaCarts = new Schema({
    
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: "products"
        },
        quantity: {
            type: Number,
            require: true
        }
    }]

})

const cartsModel = mongoose.model(collectionCarts,schemaCarts)

export default cartsModel