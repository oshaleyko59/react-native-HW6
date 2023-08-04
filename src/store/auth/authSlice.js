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
  user: { uid: null, email: null, displayName: null },
  token: null,
	isRefreshingUser: true,
	errorMsg: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	extraReducers: (builder) => {
		builder
      .addCase(authOperations.register.fulfilled, (state, action) => {
				console.debug('authOperations.register.fulfilled>>action.payload', action.payload);
        state.user = action.payload.user;
			  state.token = action.payload.token;
			})
			.addCase(authOperations.login.fulfilled, (state, action) => {
				console.debug(
					"authOperations.login.fulfilled>>action.payload",
					action.payload
				);
        state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(authOperations.logout.fulfilled, (state) => {
				state.user = { uid: null, email: null, accessToken:null };
			  state.token = null;
			})
			.addCase(authOperations.fetchCurrentUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isRefreshingUser = false;
			})
			.addCase(authOperations.fetchCurrentUser.pending, (state, action) => {
				state.isRefreshingUser = true;
			})
			.addCase(authOperations.fetchCurrentUser.rejected, (state, action) => {
				state.isRefreshingUser = false;
				//state.token = null;
			})
			.addMatcher(isPendingAction, (state) => {
        state.errorMsg = "";
        state.token = null;
			})
      .addMatcher(isRejectedAction, (state, action) => {
        console.log("isRejectedAction>>",action.error.message);
        const errm = `Authentication failed! ${action.error.message}`;
				state.errorMsg = errm;
				if (errm) {
					Alert.alert(errm);
				}
			});
	},
});

export default authSlice.reducer;
