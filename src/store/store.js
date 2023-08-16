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
//import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./auth/auth-slice";
//import postsReducer from "./postsSlice";

/* const persistConfig = {
	key: "auth",
	storage: AsyncStorage,
	whitelist: ["user"],
}; */
//const persistedReducer = persistReducer(persistConfig, authReducer);
	//	posts: postsReducer,


export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

//export const persistor = persistStore(store);

