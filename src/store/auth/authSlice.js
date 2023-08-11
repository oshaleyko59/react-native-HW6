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
	user: null,
	//token: null,
  isAuthenticated: false,
	errorMsg: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	//reducers: {}
	extraReducers: (builder) => {
		builder
			.addCase(authOperations.register.fulfilled, (state, action) => {
				state.user = action.payload.user;
				//state.token = action.payload.token;
        state.isAuthenticated = true;
			})
			.addCase(authOperations.login.fulfilled, (state, action) => {
				state.user = action.payload.user;
				//state.token = action.payload.token;
        state.isAuthenticated = true;
			})
			.addCase(authOperations.logout.fulfilled, (state) => {
				//cons ole.debug("authOperations.logout.fulfilled>>state.user=null");
        state.user = null;
        //state.token = null;
			})
			.addMatcher(isPendingAction, (state) => {
				state.errorMsg = "";
        console.log(">>isPendingAction");
        state.isAuthenticated = false;
				//state.token = null;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				const errm = `Authentication failed! ${action.error.message}`;
				state.errorMsg = errm;
				if (errm) {
					Alert.alert(errm);
				}
			});
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

/* 	reducers: {
		setUser(state, { payload }) {
      con sole.debug("setUser>> payload", payload);
			return payload;
		}, */
/* 		setToken(state, { payload }) {
			con sole.debug("setToken>> payload", payload);
			return payload;
		},
	},*/
