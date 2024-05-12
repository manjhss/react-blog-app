import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import storage from "redux-persist/lib/storage";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	auth: authReducer,
	posts: postReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

export default store;
