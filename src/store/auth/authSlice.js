import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
	name: null,
	email: null,
/* 	isLoggedIn: false,

	isRefreshingUser: true,
	errorMsg: "", */
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
});

//export actions
export default authSlice.reducer;
