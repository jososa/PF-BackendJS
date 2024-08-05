import swaggerJSDoc from "swagger-jsdoc"
import rootDir, { __dirname } from "./utils.js"

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Coder API",
            description: "Curso backend de Coderhouse"
        },
    },
    apis: [`${rootDir}/docs/**/*.yaml`],
}

export const swaggerSpecs = swaggerJSDoc(swaggerOptions)