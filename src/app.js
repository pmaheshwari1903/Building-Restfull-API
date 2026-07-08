import fs from "node:fs/promises"
import express from 'express'
import cookieParser from 'cookie-parser'
import ApiError from './common/utils/api-error.js';
import multer from "multer";
import ApiResponse from './common/utils/api-response.js';
import path from 'path';
import authRoute from './modules/auth/auth.routes.js';
import ownerRoutes from './modules/ipl-ms/routes/owner.routes.js'
import teamRoutes from './modules/ipl-ms/routes/team.routes.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())



app.use('/api/auth', authRoute)
app.use('/api/ipl-ms/owner', ownerRoutes)
app.use('/api/ipl-ms/team', teamRoutes)

app.all("{*path}", (req, res) => {
    throw ApiError.notfound(`Route ${req.originalUrl} not found`)
});



export default app