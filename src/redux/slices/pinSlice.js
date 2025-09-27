import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
const pinSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        pinFound: (state, { payload }) => payload,
    },
});

export const { pinFound } = pinSlice.actions;
export default pinSlice.reducer;
