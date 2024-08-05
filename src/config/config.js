import dotenv from "dotenv"

const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.dev"
dotenv.config({ path: envFile })

export const environment = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoSecret: process.env.MONGO_SECRET,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    NODE_ENV: process.env.NODE_ENV,
    mailing: {
        PASSWORD: process.env.MAILING_PASSWORD,
        SERVICE: process.env.MAILING_SERVICE,
        HOST: process.env.MAILING_HOST,
        USER: process.env.MAILING_USER,
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET,
    },
}