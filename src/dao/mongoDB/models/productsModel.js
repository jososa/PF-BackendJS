import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collectionProducts = "products"

const schemaProducts = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    owner: {
      default: "admin",
      type: String,
      ref: "Users",
    }
})

schemaProducts.plugin(mongoosePaginate)

export const productsModel = mongoose.model(collectionProducts, schemaProducts)

//export default productsModel