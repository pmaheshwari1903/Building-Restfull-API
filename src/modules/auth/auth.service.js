import User from './auth.model.js'
import ApiError from "../../common/utils/api-error.js"
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt.utils.js"
import connectDB from "../../common/config/db.js";
import crypto from 'crypto'
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../common/config/email.js";
import fs from 'node:fs'
import imageKit from '../../common/config/imagekit.js'
import path from 'path'
import cloudinary from "../../common/config/cloudinary.js";
import { rejects } from "node:assert";

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

const register = async ({ name, email, password, role }) => {
    const existing = await User.findOne({ email })
    if (existing) throw ApiError.conflict("Email Already Exists")

    const { rawToken, hashedToken } = generateResetToken()

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken
    })

    // Send an Email for Verification

    try {
        await sendVerificationEmail(email, rawToken)
    } catch (error) {
        await User.findByIdAndDelete(user._id); // rollback
        console.error(error);
        throw error;
    }

    const userObj = user.toObject()

    delete userObj.password
    delete userObj.verificationToken

    return userObj
}

const verifyEmail = async (token) => {
    const hashedToken = hashToken(token);
    const user = await User.findOne({ verificationToken: hashedToken }).select("+verificationToken");
    if (!user) throw ApiError.notfound("User Not Found");
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return user;
}

const login = async ({ email, password }) => {
    // take email and find user in DB
    // if user email is there in DB, check Hash Password
    // then check if password is correct or not
    // check if verified or not
    // if password is correct then generate Access and Refresh Token for client and send him both and also store that Refresh Token in DB
    // else throw error

    const user = await User.findOne({ email }).select("+password")
    if (!user) throw ApiError.notfound("Invalid Email or Password")

    // Now I will check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw ApiError.unauthorized("Invalid Email or Password")


    if (!user.isVerified) {
        throw ApiError.forbidden("Please Verify Your Email Before Login")
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role })
    const refreshToken = generateRefreshToken({ id: user._id })

    user.refreshToken = hashToken(refreshToken)
    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()

    delete userObj.password
    delete userObj.refreshToken

    return {
        user: userObj,
        accessToken,
        refreshToken
    }
}

const refreshToken = async (token) => {
    if (!token) throw ApiError.unauthorized('Refresh Token Not Available')
    const decoded = verifyRefreshToken(token) //Apne Kabile ko check kr rhe h ki do bacho ka chai code ka refresh token ka secret same hoga

    const user = await User.findById(decoded.id).select("+refreshToken")
    if (!user) throw ApiError.notfound("User Not Found")

    if (user.refreshToken !== hashToken(token)) {
        throw ApiError.unauthorized("Invalid Refresh Token")
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role })
    const refreshToken = generateRefreshToken({ id: user._id })
    user.refreshToken = hashToken(refreshToken)
    await user.save({ validateBeforeSave: false })

    const userObj = user.toObject()

    delete userObj.refreshToken

    return {
        accessToken,
        refreshToken
    }

}

const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, {
        refreshToken: null
    })
}

const forgotPassword = async ({ email }) => {
    console.log("Email from request:", email);
    const user = await User.findOne({ email })
    if (!user) throw ApiError.notfound("No account with that email")
    // const accessToken = generateAccessToken({id : user._id, role : user.role})
    // const refreshToken = generateRefreshToken({id : user._id})
    const { rawToken, hashedToken } = generateResetToken()
    user.resetPasswordToken = hashedToken
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    await user.save({ validateBeforeSave: false })

    try {
        await sendForgotPasswordEmail(email, rawToken)
    } catch (error) {
        console.error(error);
    }
}

const resetPassword = async ({ token, resetPassword }) => {
    if (!token) throw ApiError.unauthorized("Reset Token Not Available")

    const hashedToken = hashToken(token)

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
    }).select('+resetPasswordToken');

    if (!user) {
        throw ApiError.unauthorized("Invalid or Expired Reset Token")
    }

    user.password = resetPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save()

    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken

    return userObj
}

const myProfile = async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw ApiError.notfound("User not Found")
    return user;
}

const avatarUpload = async (userId, file) => { //userId authenticate middleware se aya h
    try {
        // for ImageKit Disk Storage Multer

        // const fileStream = fs.createReadStream(file.path)
        // const uploadResponse = await imageKit.files.upload({
        //     file: fileStream,
        //     fileName: file.filename,
        //     folder: "/user-avatars"
        // })


        // for Cloudinary Disk Storage Multer

        // const uploadResponse = await cloudinary.uploader.upload(file.path, {
        //     folder: "/user-avatars"
        // });

        // if(!uploadResponse) throw ApiError.notfound("Image Not Found")

        // await User.findByIdAndUpdate(userId, {avatar: uploadResponse.url}, {new:true})

        // fs.unlinkSync(file.path)

        // return{
        //     url:uploadResponse.secure_url,
        //     fileId:uploadResponse.public_id
        // }


        // This is for Memory(RAM) direct Storage
        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "/Memory-storage-images"
                },
                (error, result) => {
                    if(error){
                        return reject(error)
                    }
                    resolve(result)
                }

            );

            stream.end(file.buffer)
        });

        if(!uploadResponse) throw ApiError.notfound("Image upload failed");

        await User.findByIdAndUpdate(userId, {avatar: uploadResponse.secure_url}, {new: true})

        return {
            url: uploadResponse.secure_url,
            fieldId: uploadResponse.fieldId
        }


    } catch (error) {

        // try {
        //     if (file.path && fs.existsSync(file.path)) {
        //         fs.unlinkSync(file.path)
        //     }
        // } catch (error) {
        //     console.error("Error deleting temp file:", error);
        // }

        throw error;
    }
}

export {
    register,
    verifyEmail,
    login,
    refreshToken,
    logout,
    forgotPassword,
    resetPassword,
    myProfile,
    avatarUpload
}