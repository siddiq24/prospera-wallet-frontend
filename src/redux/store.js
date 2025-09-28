import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/userSlice";
import historyReducer from "./slices/historySlice";
import profileReducer from "./slices/profileSlice";
import topupReducer from './slices/topupSlice'

const rootReducer = combineReducers({
  user: authReducer,
  history: historyReducer,
  profile: profileReducer,
  topup: topupReducer
});

const persistConfig = {
  key: "prospera:root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
