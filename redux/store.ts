import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authUserReducer from "./authUserSlice"
import offerReducer from "./offerSlice"

export const store = () =>
  configureStore({
    reducer: {
      authUser: authUserReducer,
      offers: offerReducer,
    },
});

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });