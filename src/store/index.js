import { authApi } from "./services/authApi";
import { authSlice } from "./slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
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

import rootReducers from "./reducers/rootReducers";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appApi } from "./services/appApi";
import { addressSlice } from "./slices/addressSlice";
import { introSlice } from "./slices/introSlice";

const persistConfig = {
  key: "@rootStorageV11",
  version: 1,
  storage: AsyncStorage,
  whitelist: [authSlice.name, addressSlice.name,introSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, appApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
export default store;
