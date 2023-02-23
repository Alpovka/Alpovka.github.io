import axios from "axios"
const API_URL = "http://localhost:8000/api/users/"

const register = async (userData: any) => {
    const res = await axios.post(API_URL, userData)


    return res.data
}

const login = async (userData: any) => {
    const res = await axios.post(API_URL + "login", userData)

    if(res.data){
        localStorage.setItem("user", JSON.stringify(res.data))
    }

    return res.data
}

const logout = async () => localStorage.removeItem("user")

export const forgotPassword = async (formData: any) => {
    const res = await axios.post(API_URL + "forgot-password", formData)

    return res.data
}

const authUserService = {
    register,
    login,
    logout,
}

export default authUserService