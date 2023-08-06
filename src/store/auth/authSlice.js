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
	errorMsg: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	//reducers: {}
	extraReducers: (builder) => {
		builder
			.addCase(authOperations.register.fulfilled, (state, action) => {
				console.debug(
					"authOperations.register.fulfilled>>state.user",
					action.payload.user
				);
				state.user = action.payload.user;
				//state.token = action.payload.token;
			})
			.addCase(authOperations.login.fulfilled, (state, action) => {
				console.debug(
					"authOperations.login.fulfilled>>state.user",
					action.payload.user
				);
				state.user = action.payload.user;
				//state.token = action.payload.token;
			})
			.addCase(authOperations.logout.fulfilled, (state) => {
				console.debug("authOperations.logout.fulfilled>>state.user=null");
        state.user = null;
        //state.token = null;
			})
			.addMatcher(isPendingAction, (state) => {
				state.errorMsg = "";
				console.log(">>isPendingAction");
				//state.token = null;
			})
			.addMatcher(isRejectedAction, (state, action) => {
				console.log("isRejectedAction>>", action.error.message);
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
      console.debug("setUser>> payload", payload);
      //FIXME: leave only needed? not used!
			return payload;
		}, */
/* 		setToken(state, { payload }) {
			console.debug("setToken>> payload", payload); //FIXME:
			return payload;
		},
	},*/
