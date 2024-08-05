import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
const rootDir = dirname(__dirname)

//hasheo pwd
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//validar pwd
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export default rootDir