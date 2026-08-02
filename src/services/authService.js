import api from "./api";
export const login = async( loginData)=>{
    const response = await api.post("/Auth/login",loginData);
    return response.data;
};
export const register = async(registerData)=> {
    const response = await api.post("Auth/register",registerData);
    return response.data;
}
export const forgotPassword = async(email)=> {
    const response = await api.post("/PasswordResetOtp/forgotpassword",{
        email:email
    });
    return response.data;
}

export const verifyOtp = async(email,otp)=>{
    const response = await api.post("/PasswordResetOtp/verifyotp",{
        email,
        otp:String(otp)
    });
    return response.data
};

export const resetPassword= async(email,newPassword,confirmPassword,) => {
    const response = await api.post("/PasswordResetOtp/resetpassword",{
        email,
        newPassword,
        confirmPassword
    });
    return response.data;
};