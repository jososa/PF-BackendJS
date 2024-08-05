import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import rootDir from "./utils/utils.js"
//import __dirname from './utils.js'
//import {productsService} from './dao/services/products.service.js'
import { productRepository } from './dao/repositories/index.js'
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js'
import mockRouter from "./routes/mockRouter.js"
import connectMongoDB from './config/connectionString.config.js'
//import messageManager from './dao/controllers/mongoDB/messageManagerMongo.js'
import { messageRepository } from './dao/repositories/index.js'
import sessionRouter from './routes/sessionRouter.js'
import MongoStore from 'connect-mongo'
import session from "express-session"
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import { environment } from './config/config.js'
import { addLogger, logger } from "./utils/Logger.js"
import userRouter from "./routes/userRouter.js"
import cookieParser from 'cookie-parser'
import { swaggerSpecs } from "./utils/swaggerConfig.js"
import swaggerUiExpress from "swagger-ui-express"


//const msg = new messageManager()

const app = express()

connectMongoDB()

const server = app.listen(environment.port,()=>logger.info("Listening in",environment.port))

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(rootDir + "/public"))
app.use("/",viewsRouter)

//Carpeta de vistas
app.set('views', `${rootDir}/views`)

//Motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')

//Routes
app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)
app.use("/api/sessions", sessionRouter)
app.use("/api/mockproducts", mockRouter)
app.use("/api/users", userRouter)

//Session
app.use(
    session({
        store: new MongoStore({
            mongoUrl: environment.mongoUrl,
            ttl: 3600,
        }),
        secret: environment.mongoSecret,
        resave: false,
        saveUninitialized: false,
    })
)

//usando Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(addLogger)

//Swagger
//Route Docs
app.use("/apidocs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerSpecs, {
      customCss: ".swagger-ui .topbar { display: none }",
    })
  )

//Socket
const socketServer = new Server(server)

socketServer.on('connection', async(socket)=>{
    logger.info("Conectado al socket del server con ID: ", socket.id)

    const lstProd = await productRepository.getProducts()
    socketServer.emit("listaProductos", lstProd)

    socket.on("altaProducto", async(obj)=>{
        try {
            await productRepository.addProduct(obj)
            const lstProd = await productRepository.getProducts()
            socketServer.emit("listaProductos",lstProd)
        } catch (error) {
            logger.error("Error al crear producto: ", error.message)
        }
    })

    socket.on("deleteProduct", async(prodId)=>{
        try {
            await productRepository.deleteProduct(prodId)
            const lstProd = await productRepository.getProducts()
            socketServer.emit("listaProductos",lstProd)
        } catch (error) {
            logger.error("Error al eliminar producto: ", error.message)
        }
    })

    socket.on("mensaje", async (info) => {
        try {
            await messageRepository.createMessage(info)
            socketServer.emit("chat", await messageRepository.getMessages())
        } catch (error) {
            logger.error("Error al cargar chat: ", error.message)
        }
      })

})