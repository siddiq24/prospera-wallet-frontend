import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPinExist: false,
    token: null,
    email: null,
    issuedAt: null,
};

export const changePasswordThunk = createAsyncThunk(
  "user/change-password",
  async ({ token, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const request = new Request(`${import.meta.env.VITE_BASE_URL}/user/password`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword
        })
      });

      const response = await fetch(request);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

    extraReducers: (builder) => 
        builder
        //  CHANGE PASSWORD
        .addCase(changePasswordThunk.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isFailed = false;
            state.error = null;
        })

        .addCase(changePasswordThunk.fulfilled, (state) => {

            // UI states
            state.isLoading = false;
            state.isSuccess = true;
        })

        .addCase(changePasswordThunk.rejected, (state, action) => {

            // UI states
            state.isLoading = false;
            state.isFailed = true;
            state.error = action.payload;
        })
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
