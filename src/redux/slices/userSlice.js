import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPinExist: false,
    token: null,
};
const userSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setUser: (state, { payload }) => {
            state.isPinExist = payload.isPinExist;
            state.token = payload.token;
        },
        clearUser: (state) => {
            state.isPinExist = false;
            state.token = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
