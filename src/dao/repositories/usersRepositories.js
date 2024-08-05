
export default class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    findUserByEmail = async (username) => {
        try {
            return this.dao.findUserByEmail(username)
        } catch (error) {
            return error
        }
      }

      getAllUsers = async () => {
        try {
            return this.dao.getAllUsers()
        } catch (error) {
            return error
        }
      }
    
      createUser = async (user) => {
        try {
            return this.dao.createUser(user)
        } catch (error) {
            return error
        }
      }

      deleteUser = async (user) => {
        try {
            return this.dao.deleteUser(user)
        } catch (error) {
            return error
        }
      }

      uploadFile = async (file) => {
        try {
            return this.dao.uploadFile(file)
        } catch (error) {
            return error   
        }
      }
    
      updateUser = async (user, dataToUpdate) => {
        try {
            return this.dao.updateUser(user, dataToUpdate)
        } catch (error) {
            return error
        }
      }

      deleteInactiveUser = async (time) => {
        try {
            return this.dao.deleteInactiveUser(time)
        } catch (error) {
            return error
        }
      }

}