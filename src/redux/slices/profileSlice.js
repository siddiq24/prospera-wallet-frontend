import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // User rofile data
  fullname: null,
  email: null,
  phone: null,
  img: null,
  verified: false,

  // Loading states
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

const getProfileThunk = createAsyncThunk(
  "user/profile",
  async ({ token }, { rejectWithValue }) => {
    try {
      const request = new Request(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

const updateProfileThunk = createAsyncThunk(
  "user/update",
  async ({ token, fullname, phone }, { rejectWithValue }) => {
    try {
      const formdata = new FormData();
      formdata.append("fullname", fullname);
      formdata.append("phone", phone);

      const request = new Request(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
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

const updateAvatarThunk = createAsyncThunk(
  "user/avatar",
  async ({ token, profileImg }, { rejectWithValue }) => {
    try {
      console.log("Update Avatar started.");

      const formdata = new FormData();
      formdata.append("img", profileImg);

      const request = new Request(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
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

const deleteAvatarThunk = createAsyncThunk(
  "user/delete",
  async ({ token }, { rejectWithValue }) => {
    try {
      const request = new Request(`${import.meta.env.VITE_BASE_URL}/user/avatar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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


const profileSlice = createSlice({
  initialState,
  name: "profile",
  reducers: {
    clearProfileStates(state) {
      state.profile = initialState.profile;
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
      state.error = null;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(getProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(getProfileThunk.fulfilled, (state, { payload }) => {
        state.fullname = payload.data.full_name;
        state.email = payload.data.email;
        state.phone = payload.data.phone_number;
        state.img = payload.data.avatar;
        state.verified = payload.data.verified;

        // UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(getProfileThunk.rejected, (state, action) => {
        state.fullname = null;
        state.email = null;
        state.phone = null;
        state.img = null;
        state.verified = null;

        // UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      })
      
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(updateProfileThunk.fulfilled, (state) => {

        // UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(updateProfileThunk.rejected, (state, action) => {

        // UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      })

      // UPADATE AVATAR
      .addCase(updateAvatarThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(updateAvatarThunk.fulfilled, (state) => {

        // UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(updateAvatarThunk.rejected, (state, action) => {

        // UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      })

      .addCase(deleteAvatarThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })

      .addCase(deleteAvatarThunk.fulfilled, (state) => {
        state.img = null

        // UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(deleteAvatarThunk.rejected, (state, action) => {

        // UI states
        state.isLoading = false;
        state.isFailed = true;
        state.error = action.payload;
      })
});

export default profileSlice.reducer;

// Export actions
export const profileActions = {
  ...profileSlice.actions,
  getProfileThunk,
  updateProfileThunk,
  updateAvatarThunk,
  deleteAvatarThunk
};
