import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPots : 0,
    pots: [],
    creationFee : "0",
    creationEvents : [],
    boughtEvents : [],
    rewardClaimedEvents : []
};

export const potsSlice = createSlice({
    name: "pots",
    initialState,
    reducers: {
        loadPotDetails: (state, action) => {
            state.totalPots = action.payload.totalPots;
            state.pots = action.payload.pots;
            state.creationFee = action.payload.creationFee;
            state.creationEvents = action.payload.creationEvents;
            state.boughtEvents = action.payload.boughtEvents;
            state.rewardClaimedEvents = action.payload.rewardClaimedEvents;
        },
        setCreationFee: (state, action) => {
            state.creationFee = action.payload;
        },
        setEvents: (state,action) => {
            state.creationFee = action.payload.craetionFee;
            state.creationEvents = action.payload.creationEvents;
            state.boughtEvents = action.payload.boughtEvents;
            state.rewardEvents = action.payload.rewardEvents;
        }
    },
});

export const { loadPotDetails , setCreationFee , setEvents } = potsSlice.actions;
export default potsSlice.reducer;
