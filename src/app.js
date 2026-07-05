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



app.use('/api/auth', authRoute)

app.all("{*path}", (req, res) => {
    throw ApiError.notfound(`Route ${req.originalUrl} not found`)
});



export default app