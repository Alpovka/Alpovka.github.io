import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import offerService from "../pages/api/offers/offerService";

const initialState = {
    offers: <any>[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const createOffer = createAsyncThunk("offers/createOffer", async (offerData: any, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState()
        const token = state.authUser.user.token
        return await offerService.createOffer(offerData, token)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getOffers = createAsyncThunk("offers/getOffers", async (_, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState()
        const token = state.authUser.user.token
        return await offerService.getOffers(token)
    } catch(error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const removeOffer = createAsyncThunk("offers/removeOffer", async (id: any, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState()
        const token = state.authUser.user.token
        return await offerService.removeOffer(id, token)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateOffer = createAsyncThunk("offers/updateOffer", async (offerData: any, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState()
        const token = state.authUser.user.token
        return await offerService.updateOffer(offerData, token)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const offerSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(createOffer.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(createOffer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.offers.push(action.payload)
        })
        .addCase(createOffer.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = JSON.stringify(action.payload)
        })
        .addCase(getOffers.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(getOffers.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.offers = action.payload
        })
        .addCase(getOffers.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message =  JSON.stringify(action.payload)
        }).addCase(removeOffer.pending, (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        .addCase(removeOffer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload._id
            state.offers.filter((offer: any) => offer._id !== action.payload._id)
        })
        .addCase(removeOffer.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = JSON.stringify(action.payload)
        })
        .addCase(updateOffer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = action.payload
            state.offers.filter((offer: any) => offer._id !== action.payload._id).push(action.payload)
        })
        .addCase(updateOffer.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message =  JSON.stringify(action.payload)
        })
    }
})

export const { reset } = offerSlice.actions
export default offerSlice.reducer