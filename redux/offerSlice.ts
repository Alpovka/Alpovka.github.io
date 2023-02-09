import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import offerService from "../pages/api/offers/offerService";

const initialState = {
    offers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const createOffer = createAsyncThunk("offers/createOffer", async (offerData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authUser.user.token
        return await offerService.createOffer(offerData, token)
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getOffers = createAsyncThunk("offers/getOffers", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authUser.user.token
        return await offerService.getOffers(token)
    } catch(error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const removeOffer = createAsyncThunk("offers/removeOffer", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().authUser.user.token
        return await offerService.removeOffer(id, token)
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
            state.message = action.payload
        }).addCase(getOffers.pending, (state) => {
            state.isLoading = true
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
            state.message = action.payload
        }).addCase(removeOffer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(removeOffer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.offers.filter((offer) => offer._id !== action.payload.id)
        })
        .addCase(removeOffer.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = offerSlice.actions
export default offerSlice.reducer