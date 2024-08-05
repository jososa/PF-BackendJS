import multer from "multer"
import rootDir from "../utils/utils.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = ""
      if (file.fieldname === "profiles") {
        folder = "profiles"
      } else if (file.fieldname === "products") {
        folder = "products"
      } else {
        folder = "documents"
      }
      cb(null, `${rootDir}/public/uploads/${folder}`)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now())
    },
  })
  
  export const uploader = multer({
    storage,
    fileFilter: function (req, file, cb) {
      const allowedFields = [
        "identificacion",
        "domicilio",
        "estado_cuenta",
        "products",
        "profiles",
      ]
      if (allowedFields.includes(file.fieldname)) {
        cb(null, true)
      } else {
        cb(null, false)
        cb(new multer.MulterError("Invalid fieldname"))
      }
    },
  })