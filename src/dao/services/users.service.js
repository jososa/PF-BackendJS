//import userModel from "../models/usersModel.js";
import { userRepository } from "../repositories/index.js"

class usersService {

    createUser = async (user) => {
        try {
            return await userRepository.createUser(user)
        } catch (error) {
            return error
        }
    }

    findUserByEmail = async (username) => {
        try {
            return await userRepository.findUserByEmail(username)
        } catch (error) {
            return error
        }
    }

    getAllUsers = async () => {
        try {
            return await userRepository.getAllUsers()
        } catch (error) {
            return error
        }
    }

    updloadFile = async (file) => {
        try {
            return await userRepository.uploadFile(file)
        } catch (error) {
            return error
        }
    }

    deleteUser = async (user) => {
        try {
            return await userRepository.deleteUser(user)
        } catch (error) {
            return error
        }
    }

    updateUser = async (user, updateData) => {
        try {
            return await userRepository.updateUser(user, updateData)
        } catch (error) {
            return error
        }
    }

    deleteInactiveUser = async (time) => {
        try {
            return await userRepository.deleteInactiveUser(time)
        } catch (error) {
            return error
        }
    }

    // createUser = async (user) => {
    //     try {
    //         const result = await userModel.create(user)
    //         return result
    //     } catch (error) {
    //         return error
    //     }
    // }
    
    // findUserByEmail = async (username) => {
    //     try {
    //         const result = await userModel.findOne({ email: username })
    //         return result
    //     } catch (error) {
    //         return error
    //     }
    // }
    
    // updateUser = async (user, updateData) => {
    //     try {
    //         result = await userModel.updateOne( { _id: user._id }, { $set: updateData } )
    //         return result
    //     } catch (error) {
    //         return error
    //     }
    // }

}

export const userService = new usersService()

// export default {
//     createUser,
//     findUserByEmail,
//     updateUser
// }