import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPinExist: false,
    token: null,
    email: null,
    issuedAt: null,
};
const userSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setUser: (state, { payload }) => {
            state.isPinExist = payload.isPinExist;
            state.token = payload.token;
            state.email = payload.email;
            state.issuedAt = payload.issuedAt;
        },
        clearUser: (state) => {
            state.isPinExist = false;
            state.token = null;
            state.email = null;
            state.issuedAt = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
