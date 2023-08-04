import { configureStore } from "@reduxjs/toolkit"; 
import {
	persistReducer,
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./auth/authSlice";
import postsReducer from "./postsSlice";

const persistConfig = {
	key: "auth",
	storage: AsyncStorage,
	whitelist: ["token"],
};
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedReducer,
		posts: postsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

