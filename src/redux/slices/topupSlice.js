// src/redux/slices/topupSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Ambil daftar bank/internal accounts
export const fetchBanks = createAsyncThunk(
  "topup/fetchBanks",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const token = user?.token;
      if (!token) throw new Error("User belum login");

      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/internal`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message);
    }
  }
);

// Submit TopUp
export const submitTopup = createAsyncThunk(
"topup/submitTopup",
async (_, { getState, rejectWithValue }) => {
try {
const { topup, user } = getState();
const token = user?.token;

  if (!token) throw new Error("User belum login");

  const payload = {
    type: "top_up",
    amount: Number(topup.amount),
    total: Number(topup.amount) + Number(topup.tax),
    internal_account_id: topup.selectedBank?.id,
  };

  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/transaction`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
} catch (err) {
  return rejectWithValue(
    err.response?.data || { message: err.message }
  );
}


}
);

const initialState = {
  banks: [],
  amount: "",
  selectedBank: null,
  va: null,
  tax: 0,
  loading: false,
  error: null,
  success: null,
};

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    setAmount: (state, { payload }) => {
      state.amount = payload;
    },
    setBank: (state, { payload }) => {
      state.selectedBank = payload;
      state.tax = payload.tax || 0;
      state.va = payload.code
        ? `${payload.code}${payload.phone}`
        : payload.phone;
    },
    clearTopup: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.banks = payload.map((bank) => {
          let code = "";
          const lower = bank.name.toLowerCase();

          if (lower.includes("bank central asia")) code = "314";
          else if (lower.includes("bank rakyat indonesia")) code = "102";
          else if (lower.includes("dana")) code = "559";
          else if (lower.includes("gopay")) code = "118";
          else if (lower.includes("ovo")) code = "237";

          return { ...bank, code };
        });
      })
      .addCase(fetchBanks.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(submitTopup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitTopup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload;
        state.va = payload.va;
      })
      .addCase(submitTopup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = null;
      });
  },
});

export const { setAmount, setBank, clearTopup } = topupSlice.actions;
export default topupSlice.reducer;
