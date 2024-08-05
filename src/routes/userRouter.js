import { Router } from "express"
import { userController } from "../controllers/userController.js"
import { uploader } from "../middlewares/multer.js"
import { adminViewAuth, authorization } from "../middlewares/auth.js"

const userRouter = Router()

userRouter.get("/", authorization(["admin"]), userController.getAllUsers)

userRouter.post("/premium/:uid", userController.setUserRole)

userRouter.post("/:uid/documents", uploader.fields([{name:"identificacion"},
                                                    {name:"domicilio"},
                                                    {name:"estado_cuenta"},
                                                    {name:"products"},
                                                    {name:"profiles"}
]), userController.uploadFile)

userRouter.delete("/:uid", adminViewAuth, userController.deleteUser)

userRouter.delete("/", authorization(["admin"]), userController.deleteInactiveUser)

export default userRouter