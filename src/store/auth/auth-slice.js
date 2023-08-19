import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setIsAuthenticated(state, { payload }) {
			return { isAuthenticated: payload };
		},
	},
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
