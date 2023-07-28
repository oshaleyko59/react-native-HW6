import { auth } from "../../../firebase/config";

//register
export const authRegister = () => async (dispatch, getState) => {
	try {
    const user = await auth.createUserWithEmailAndPassword;
    console.log("user>>", user);
	} catch (e) {
		console.log(e.message);
	}
};

//login
export const authLogin = () => async (dispatch, getState) => {};

//logout
export const authLogout = () => async (dispatch, getState) => {};


