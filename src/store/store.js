import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/auth-slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});



/* nothing to store there with firebase SDK
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

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}), */
