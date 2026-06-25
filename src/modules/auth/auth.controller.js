import * as authService from "./auth.service.js"
import ApiResponse from "../../common/utils/api-response.js"
import ApiError from "../../common/utils/api-error.js"

const register = async (req, res) => {
    const user = await authService.register(req.body)
    ApiResponse.created(res,"Registration Successfull",user)
}

const verifyEmail = async(req, res) => {
    const user = authService.verifyEmail(req.params.token);
    ApiResponse.ok(res,"Email Verified Successfully")
} 

const login = async (req, res) => {
    try{
    const {user, accessToken, refreshToken} = await authService.login(req.body)
    
    res.cookie("refreshToken", refreshToken,{
        httpOnly : true,
        secure: true,
        maxAge : 7 * 24 * 60 * 60 * 1000
    });
    res.cookie("accessToken", accessToken,{
        httpOnly : true,
        secure: true,
        maxAge : 15 * 60 * 1000
    });

    ApiResponse.ok(res,"Login Successfull",{
        user,
        accessToken
    })
}
catch(error){
    console.error(error)
    res.status(404).json({
        success : 'Failed',
        error: error?.message || "Server Error"
    })
}
}

const refresh = async(req, res) => {
    const {accessToken,refreshToken} = await authService.refresh(req.cookies.refreshToken);

    res.cookie("refreshToken", refreshToken,{
        httpOnly : true,
        secure: true,
        maxAge : 7 * 24 * 60 * 60 * 1000
    });

    res.cookie("accessToken", accessToken,{
        httpOnly : true,
        secure: true,
        maxAge : 15 * 60 * 1000
    });

    ApiResponse.ok(res, "Token Refreshed Successfully", {
        accessToken
    })

    
}

const logout = async(req, res) => {
    const user = await authService.logout(req.user.id)
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken")
    ApiResponse.ok(res, "Logout Success")
}

const forgotPassword = async(req, res) => {
    await authService.forgotPassword(req.body)
    ApiResponse.ok(res, "Password reset link has been sent to your email.");
};

const resetPassword = async(req, res) => {
    const user = await authService.resetPassword({
        token : req.params.token,
        resetPassword : req.body.resetPassword,
    });

    ApiResponse.ok(res, "Password Reset Successfully", user)
};

const myProfile = async(req, res) => {
    const user = await authService.myProfile(req.user.id)
    ApiResponse.ok(res, "User Profile", user);
};

export {
    register,
    verifyEmail,
    login,
    refresh,
    logout,
    forgotPassword,
    resetPassword,
    myProfile
}