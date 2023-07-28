import {  configureStore, } from "@reduxjs/toolkit";//combineReducers
//import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import authReducer from "./auth/authSlice";
import postsReducer from './postsSlice';

/* const rootReducer = combineReducers({

}); */

/* const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
} */

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer
  },
});
