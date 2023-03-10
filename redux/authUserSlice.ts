import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authUserService from "../pages/api/users/authUserService";


const initialState = {
    user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") as string) : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const register = createAsyncThunk("authUser/register", async (user: any, thunkAPI) => {
    try {
        return await authUserService.register(user)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk("authUser/login", async (user: any, thunkAPI) => {
    try {
        return await authUserService.login(user)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("authUser/logout", async () => 
    await authUserService.logout()
)

export const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false,
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        }).addCase(register.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
        }).addCase(register.rejected, (state, action) =>{
            state.isSuccess = false
            state.isLoading = false
            state.isError = true
            state.message = JSON.stringify(action.payload)
        }).addCase(login.pending, (state) => {
            state.isLoading = true
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        }).addCase(login.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = JSON.stringify(action.payload)
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
    }
})

export const { reset } = authUserSlice.actions;

export default authUserSlice.reducer;