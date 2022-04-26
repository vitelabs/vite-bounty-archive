import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import potsReducer from "./slice/potSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        pots: potsReducer,
    },
});
