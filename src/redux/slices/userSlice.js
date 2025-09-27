import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPinExist: false,
    token: null,
    email: null,
};
const userSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setUser: (state, { payload }) => {
            state.isPinExist = payload.isPinExist;
            state.token = payload.token;
            state.email = payload.email;
        },
        clearUser: (state) => {
            state.isPinExist = false;
            state.token = null;
            state.email = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
