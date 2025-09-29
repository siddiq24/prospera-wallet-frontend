import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = import.meta.env.VITE_BASE_URL;

// thunk untuk fetch history
export const fetchHistory = createAsyncThunk(
    "history/fetchHistory",
    async (token, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${BASE}/user/history`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


const initialState = {
    history: [],
    loading: false,
    error: null,
};
const historySlice = createSlice({
    initialState,
    name: "history",
    reducers: {
        clearHistory: (state) => {
            state.history = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
// console.log("🚀 ~ historySlice:", historySlice)

export const { clearHistory } = historySlice.actions;
export default historySlice.reducer;
