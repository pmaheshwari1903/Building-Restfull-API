import fs from "node:fs/promises"
import express from 'express'
import cookieParser from 'cookie-parser'
import authRoute from './modules/auth/auth.routes.js';
import ApiError from './common/utils/api-error.js';
import multer from "multer";
import ApiResponse from './common/utils/api-response.js';
import path from 'path';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// multer(File Upload)


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const extension = path.extname(file.originalname)
//         cb(null, file.fieldname + '-' + uniqueSuffix + extension)
//     }
// }) // Yeh file ko disk me store kiya

const storage = multer.memoryStorage()  // Yeh file ko Memory Storage (RAM) me store kiya

// const upload = multer() // Yeh file ko memory me store kiya

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize:1024*1024*2 //2mb
    },
    fileFilter:(req, file, cb) => {
        const allowed = ['image/png', 'image/jpeg', 'application/pdf']
        if(allowed.includes(file.mimetype)){
            cb(null, true)
        }
        else{
            cb(new Error("File Type not supported"),false)
        }
    }
})  


app.post('/upload', upload.single("file"), async (req, res) => {
    const fileContent = req.file.buffer
    const filePath = path.join("public", "uploads", req.file.originalname);
    await fs.writeFile(filePath,fileContent)
    // res.send("Image Saved")
    // console.log(fileContent);
    
    ApiResponse.ok(res, "File Uploaded Successfully")
})




app.use('/api/auth', authRoute)

app.all("{*path}", (req, res) => {
    throw ApiError.notfound(`Route ${req.originalUrl} not found`)
});



export default app