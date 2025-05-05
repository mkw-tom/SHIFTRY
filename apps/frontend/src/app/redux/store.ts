"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerPayment from "./slices/registerPayment";
import store from "./slices/store";
import user from "./slices/user";

import { persistReducer, persistStore } from "redux-persist";
import storage from "../lib/storage";
import tokenReducer from "./slices/token";

const rootReducer = combineReducers({
	token: tokenReducer,
	user: user,
	store: store,
	registerPayment: registerPayment,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
