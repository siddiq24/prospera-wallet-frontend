import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // User rofile data
  fullname: null,
  email: null,
  phone: null,
  img: null,

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
  async ({ token, fullname, phone, profileImg }, { rejectWithValue }) => {
    try {
      const formdata = new FormData();
      formdata.append("fullname", fullname);
      formdata.append("phone", phone);
      formdata.append("img", profileImg);

      const request = new Request(`${import.meta.env.VITE_BASE_URL}/user`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });

      console.log("form data : ");
      console.log(formdata);

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
        console.log("img (get): ");
        console.log(state.img);

        // UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(getProfileThunk.rejected, (state, action) => {
        state.fullname = null;
        state.email = null;
        state.phone = null;
        state.img = null;

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

      .addCase(updateProfileThunk.fulfilled, (state, { _ }) => {
        console.log("Profile Updated");

        // UI states
        state.isLoading = false;
        state.isSuccess = true;
      })

      .addCase(updateProfileThunk.rejected, (state, action) => {
        console.log("Profile Failed Update");

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
};
