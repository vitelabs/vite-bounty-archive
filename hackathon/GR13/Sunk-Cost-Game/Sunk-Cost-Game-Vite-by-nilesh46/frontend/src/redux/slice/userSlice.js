import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    address: "",
    uri: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUri: (state, action) => {
            state.uri = action.payload;
        },
        login: (state, action) => {
            state.address = action.payload;
        },
        logout: (state) => {
            state.address = "";
        },
    },
});

export const { login, logout, setUri } = userSlice.actions;
export default userSlice.reducer;
