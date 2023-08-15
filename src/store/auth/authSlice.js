import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import authOperations from "../../store/auth/authOperations";

const isRejectedAction = (action) => {
	return action.type.startsWith("auth/") && action.type.endsWith("rejected");
};

const isPendingAction = (action) => {
	return action.type.startsWith("auth/") && action.type.endsWith("pending");
};

const initialState = {
  isAuthenticated: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
  setIsAuthenticated(state, { payload }) {
			console.debug("setIsAuthenticated>> payload", payload);
			return {isAuthenticated: payload};
		}
  },
	extraReducers: (builder) => {
		builder
			.addCase(authOperations.register.fulfilled, (state) => {
				state.isAuthenticated = true;
			})
			.addCase(authOperations.login.fulfilled, (state) => {
				state.isAuthenticated = true;
			})
			.addCase(authOperations.logout.fulfilled, (state) => {
			})
			.addMatcher(isPendingAction, (state) => {
				console.log(">>isPendingAction");
				state.isAuthenticated = false;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				const errm = `Authentication failed! ${action.error.message}`;
        if (errm) {
          console.error(errm);
					Alert.alert(errm);
				}
			});
	},
});
export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;

