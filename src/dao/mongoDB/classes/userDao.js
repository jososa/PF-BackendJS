// import usersService from "../../services/users.service.js"
// import CartService from "../../services/carts.service.js"
// import { createHash, isValidPassword } from "../../../utils.js"
import userModel from "../models/usersModel.js"

export default class UserDao {

    createUser = async (user) => {
        try {
            const result = await userModel.create(user)
            return result
        } catch (error) {
            return error
        }
    }

    getAllUsers = async () => {
        try {
            const result = await userModel.find()
            return result
        } catch (error) {
            return error
        }
    }

    findUserByEmail = async (username) => {
        try {
            const result = await userModel.findOne({ email: username })
            return result
        } catch (error) {
            return error
        }
    }

    uploadFile = async (file) => {
        try {
            const uploadedFile = await userModel.create(file)
            return uploadedFile
        } catch (error) {
            return error
        }
    }

    deleteUser = async (id) => {
        try {
            result = await userModel.deleteOne({ _id: id }) 
            return result
        } catch (error) {
            return error
        }
    }

    updateUser = async (user, updateData) => {
        try {
            result = await userModel.updateOne( { _id: user._id }, { $set: updateData } )
            return result
        } catch (error) {
            return error
        }
    }

    deleteInactiveUser = async (time) => {
        try {
            const result = await userModel.deleteMany({
                $or: [
                  { last_connection: { $lt: time.toString() } },
                  { last_connection: { $exists: false } },
                ],
              })
              return result
        } catch (error) {
            return error
        }
    }

    // async registerUser(req, username, password, done){
    //     const { first_name, last_name, email, age } = req.body
    //     try {
    //         const user = await usersService.findUserByEmail(username)
    //         if(user){
    //             console.log("El usuario ya se encuentra registrado")
    //             return done(null, false)
    //         }

    //         const cart = await CartService.createCart()

    //         const newUser = {
    //             first_name,
    //             last_name,
    //             email,
    //             age,
    //             password: createHash(password),
    //             cart: cart,
    //             role: "usuario"
    //         }
    //         const result = usersService.createUser(newUser)
    //         return done(null, result)
    //     } catch (error) {
    //         return done(error)
    //     }
    // }

    // async loginUser(username, password, done){
    //     try {
    //         if (
    //           username === "adminCoder@coder.com" &&
    //           password === "adminCod3r123"
    //         ) {

    //           const adminUser = {
    //             first_name: "Admin",
    //             last_name: "Coder",
    //             email: "adminCoder@coder.com",
    //             age: 33,
    //             role: "admin",
    //           }
    //           return done(null, adminUser)
    //         }
  
    //         const user = await usersService.findUserByEmail(username)
    //         if (!user) return done(null, false)
    //         const valid = isValidPassword(user, password)
    //         if (!valid) return done(null, false)
  
    //         return done(null, user)
    //       } catch (error) {
    //         return done(error)
    //       }
    // }

    // async loginGithub(accessToken, refreshToken, profile, done) {
    //     try {
    //         const user = usersService.findUserByEmail(profile._json.email)
    //         if(!user){
    //             const newUser = {
    //                 first_name: profile._json.name,
    //                 last_name: "",
    //                 age: 33,
    //                 email: profile._json.email,
    //                 password: "",
    //                 role: "usuario"
    //             }
    //             let createdUser = await usersService.createUser(newUser)
    //             done(null, createdUser)
    //         } else{
    //             done(null, user)
    //         }
    //     } catch (error) {
    //         return done(error)
    //     }
    // }

}

//export const userManager = new UserManager()