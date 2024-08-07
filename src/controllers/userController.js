import { userService } from "../dao/services/users.service.js"
import { cartService } from "../dao/services/carts.service.js"
import { createHash, isValidPassword } from "../utils/utils.js"
import { logger } from "../utils/Logger.js"
import { environment } from "../config/config.js"
import UserDTO from "../dao/DTO/userDTO.js"
import MailingService from "../dao/services/mail.service.js"
import UserRepository from "../dao/repositories/usersRepositories.js"
import { generateToken, validateToken } from "../utils/jwt.js"
import { userRepository } from "../dao/repositories/index.js"
import userModel from "../dao/mongoDB/models/usersModel.js"
import moment from "moment"
import { environment } from "../config/config.js"

class UserController {

    async registerUser(req, username, password, done){
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await userService.findUserByEmail(username)
            if(user){
                logger.warning("El usuario ya se encuentra registrado")
                return done(null, false)
            }

            const cart = await cartService.createCart()

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password),
                cart: cart,
                role: "usuario"
            }
            const result = userService.createUser(newUser)
            logger.info("Usuario creado con exito", newUser)
            return done(null, result)
        } catch (error) {
            logger.error(error)
            return done(error)
        }
    }

    async getAllUsers(req, res){
      try {
        const users = await userService.getAllUsers()
        const userDTOs = users.map((user) => new UserDTO(user))
        res.status(200).send({ status: "success", payload: userDTOs })
      } catch (error) {
        return error
      }
    }

    async loginUser(username, password, done){
        try {
            if (
              username === "adminCoder@coder.com" &&
              password === "adminCod3r123"
            ) {

              const adminUser = {
                first_name: "Admin",
                last_name: "Coder",
                email: "adminCoder@coder.com",
                age: 33,
                role: "admin",
              }
              return done(null, adminUser)
            }
  
            const user = await userService.findUserByEmail(username)
            if (!user){
                logger.fatal("Usuario no encontrado")
                return done(null, false)
            }

            const valid = isValidPassword(user, password)
            if (!valid) return done(null, false)
              const last_connection = new Date().toString()
            await userService.updateUser(user, { last_connection: last_connection })
            return done(null, user, last_connection)
          } catch (error) {
            logger.error("Usuario no encontrado", error)
            return done(error)
          }
    }

    async loginGithub(accessToken, refreshToken, profile, done) {
        try {
            const user = userService.findUserByEmail(profile._json.email)
            if(!user){
                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: 33,
                    email: profile._json.email,
                    password: "",
                    role: "usuario"
                }
                let createdUser = await userService.createUser(newUser)
                done(null, createdUser)
            } else{
                done(null, user)
            }
        } catch (error) {
            logger.error("Usuario no encontrado", error)
            return done(error)
        }
    }

    async setUserRole(req, res) {
        const { uid } = req.params
        const user = await userService.findUserById(uid)
        
        if (user.role === "admin") {
          return res.status(400).json({ status: "error", message: "Los administradores no pueden cambiar rol" })
        }
    
        let newRole = null
        if (user.role === "premium") {
          newRole = { role: "usuario" }
        } else if (user.role === "usuario") {

          const requiredDocuments = [
            "identificacion",
            "domicilio",
            "estado_cuenta",
          ]

          const hasRequiredDocuments = requiredDocuments.every((doc) =>
            user.documents.some((userDoc) => userDoc.name === doc)
          )

          if (!hasRequiredDocuments) {
            return res.status(400).json({
              status: "error",
              message: "No se cargo la documentacion solicitada",
            })
          }
          newRole = { role: "premium" }
        } else {
          return res.status(400).json({ status: "error", message: "Rol no válido" });
        }
    
        try {
          await userService.updateUser(user, newRole);
          res.send({ status: "success", message: "Se ha actualizado el rol" });
        } catch (error) {
          res
            .status(500)
            .json({ status: "error", message: "Error actualizando el rol" });
        }
      }

      async uploadFile(req, res) {
        const { uid } = req.params
        const files = req.files
    
        const user = await userService.findUserById(uid)
        if (!user) {
          return res.status(404).send({ status: "error", error: "Usuario no encontrado" })
        }
    
        try {
          if (!files || Object.keys(files).length === 0) {
            return res.status(400).send({ status: "error", error: "Archivo no cargado" })
          }
    
          const documents = []
          Object.keys(files).forEach((fieldname) => {
            files[fieldname].forEach((file) => {
              documents.push({
                name: file.fieldname,
                reference: `/uploads/${fieldname}/${uid}`,
              })
            })
          })
    
          await userService.updateUser(user, { documents: documents })
    
          res.send({ status: "success", documents })
        } catch (error) {
          res.status(500).send({ status: "error", message: error })
        }
      }

      async sendEmailToRestorePassword(req, res) {
        const { email } = req.body

        if (!email) return
    
        const user = await userRepository.findUserByEmail(email)
        if (!user)
          return res.status(400).json({ status: "error", message: "Usuario no encontrado" })
    
        const token = generateToken(user._id)
    
        const mailer = new MailingService()
        await mailer.sendMail({
          from: "E-commerce Admin",
          to: user.email,
          subject: "Recuperá tu contraseña",
          html: `<div><h1>¡Hacé click en el siguiente link para recuperar tu contraseña!</h1>
              <a href="${environment.BASE_URL}/restorepass/${token}"}>Restaure su contraseña haciendo click aquí</a>
                  </div>`,
        })
        res.send({ status: "success", message: "Email enviado" })
      }

      async deleteInactiveUser(req, res) {
        const time = new Date()
        time.setDate(time.getDate() - 2)
    
        try {
          const usersToBeDeleted = await userModel.find({
            $or: [
              { last_connection: { $lt: time.toString() } },
              { last_connection: { $exists: false } },
            ],
          })
    
          if (usersToBeDeleted.length === 0) {
            return res.status(200).send({
              status: "success",
              message: "No se encontraron usuarios inactivos para eliminar.",
            })
          }
    
          const mailer = new MailingService()
          for (const user of usersToBeDeleted) {
            await mailer.sendMail({
              from: "E-commerce Admin",
              to: user.email,
              subject: "Tu cuenta ha sido eliminada",
              html: `<div><h1>¡Hemos eliminado tu cuenta por inactividad!</h1>
                <a href="${environment.BASE_URL}/register">Si desea volver a crear una cuenta puede hacerlo aquí</a>
                    </div>`,
            })
          }
    
          const result = await userService.deleteInactiveUser(time)
    
          res.status(200).send({
            status: "success",
            message: `${result.deletedCount} usuarios eliminados por inactividad.`,
            deletedCount: result.deletedCount,
          })
        } catch (error) {
          res.status(500).send({
            status: "error",
            message: "Error when deleting users",
            error,
          })
        }
      }
    
      async restorePassword(req, res) {
        const { password } = req.body
        const { token } = req.params
        const decodedToken = validateToken(token)
        if (!decodedToken) {
          return res.status(400).json({ status: "error", message: "Token invalido" })
        }
        const { userId } = decodedToken
    
        if (!password) {
          return res.status(400).json({ status: "error", message: "Password requerido" })
        }
    
        const user = await userRepository.findUserById(userId)
        if (!user) {
          return res.status(400).json({ status: "error", message: "No se encuentra el usuario" })
        }
    
        const passwordMatch = isValidPassword(user, password)
        if (passwordMatch) {
          return res.status(400).json({ status: "error", message: "La nueva contraseña no puede ser igual a la antigua" })
        }
    
        const newPass = createHash(password)
        const passwordToUpdate = { password: newPass }
    
        await userRepository.updateUser(user, passwordToUpdate)
    
        res.status(200).json({ status: "success", message: "Password actualizado" })
      }
    
      async current(req, res) {
        if (!req.user) {
          res.status(403).json({ status: "Error", message: "No user authenticated" });
        }
        const currentUser = new UserDTO(req.user)
        res.status(200).json({ status: "success", payload: currentUser })
      }

      async logoutUser(req, res) {
        const user = req.user
        req.session.destroy(async (err) => {
          if (!err) {
            const last_connection = moment()
            await userService.updateUser(user, { last_connection: last_connection })
    
            await userService.findUserById(user._id)
            res.status(200).json({ status: "success", message: "Closed session", last_connection })
          } else {
            res.status(500).json({ error: err })
          }
        })
      }

      async deleteUser(req, res) {
        const { uid } = req.params
        try {
          await userService.deleteUser(uid)
          res.send({ status: "success", message: "User has been deleted" })
        } catch (error) {
          res.status(500).send({ status: "error", message: "Error when deleting user" })
        }
      }

}

export const userController = new UserController()