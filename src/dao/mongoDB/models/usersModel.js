import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionUsers = "Users"

const schemaUsers = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cart:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    },
    role: {
        type: String,
        enum: ["usuario", "admin", "premium"],
        default: "usuario",
    },
    documents: [
      {
        name: String,
        reference: String,
      },
    ],
    last_connection: {
      type: Date,
    }
})

schemaUsers.plugin(mongoosePaginate)

const userModel = mongoose.model(collectionUsers, schemaUsers)

export default userModel