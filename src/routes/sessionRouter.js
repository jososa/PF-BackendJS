import { Router } from "express"
//import usersService from "../dao/services/users.service.js"
import userDTO from "../dao/DTO/userDTO.js"
import { userRepository } from "../dao/repositories/index.js"
import { createHash, isValidPassword } from "../utils/utils.js"
import passport from "passport"
import { environment } from "../config/config.js"
import MailingService from "../dao/services/mail.service.js"
import { userController } from "../controllers/userController.js"

const sessionRouter = Router()

//Registro de Usuario
sessionRouter.post("/register", passport.authenticate('register',{failureRedirect:'/failregister'}), async(req,res) =>{
  res.status(201).send({status: "success", message: "Usuario registrado"})
})

sessionRouter.get("/failregister", async(req, res)=>{
  req.logger.error("Falló el registro")
  res.status(400).json({ error: "Falló el registro" })
})

//Login de Usuario
sessionRouter.post("/login", passport.authenticate('login',{failureRedirect:"/faillogin"}), async(req, res)=>{
  console.log("Entro al router")
  if(!req.user){
    return res.status(400).send('error')
  }
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role
  }
  req.logger.info("Usuario logueado", req.session.user)
  res.status(200).json({ status: "success", payload: req.user })
})

sessionRouter.get("/faillogin", async(req, res)=>{
  console.log("error")
  res.send({error:"Fallo"})
})

sessionRouter.get("/github", passport.authenticate("github", {scope:["user:email"]}),
  async (req, res) => {
    res.send({status:"success", message: res})
  }
)

sessionRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect:["/login"]}),
  async (req, res) => {
    req.session.user = req.user
    res.redirect("/")
  }
)

sessionRouter.get("/logout", userController.logoutUser)

sessionRouter.get("/current", userController.current)

//Restaurar password
sessionRouter.post("/restore", userController.sendEmailToRestorePassword)

sessionRouter.post("/restorepass/:token", userController.restorePassword)

export default sessionRouter