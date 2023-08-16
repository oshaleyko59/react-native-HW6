import { useSelector, useDispatch } from "react-redux";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	AuthErrorCodes,
} from "firebase/auth";
import md5 from "md5";

import { auth } from "../firebase/config";
import { setIsAuthenticated } from "../store/auth/auth-slice";

const transformErrorMsg = (error) => {
	switch (error.code) {
		case AuthErrorCodes.INVALID_EMAIL:
			return "Invalid email";
		case AuthErrorCodes.INVALID_PASSWORD:
			return "Invalid password. Try again";
		default:
			return `${error.message}`;
	}
};

const updateUserProfile = async (name, email) => {
	const user = auth.currentUser;
	if (user) {
		const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
			email
		)}?d=wavatar`;
		return updateProfile(user, { displayName: name, photoURL: gravatarUrl });
	}
	throw new Error("updateUserProfile>>Unexpected_ERR: no current user");
};

async function authenticate(mode, userData) {
	const { email, password, name } = userData;
	//console.log("auth/>>userData", userData);
	try {
		if (mode === "register") {
			await createUserWithEmailAndPassword(auth, email, password);
			await updateUserProfile(name, email);
			saveAuthor(uid, displayName, photoURL);
		} else if (mode === "login") {
			await signInWithEmailAndPassword(auth, email, password);
		} else {
			throw new Error("DEV_ERR");
		}
	} catch (error) {
		const msg = transformErrorMsg(error);
		console.log("auth/>>error", msg);
		throw new Error(msg);
	}
}

const useAuth = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); //!!auth.currentUser;
	const user = auth.currentUser;

	/**
	 * set value isAuthenticated in store
	 * @params payload = true/false
	 */
	const setAuthed = (payload) => dispatch(setIsAuthenticated(payload));

	/**
	 * register
	 * @params {email, password}
	 */
	const onRegister = async (userData) => {
		try {
			authenticate("register", userData);
		} catch (error) {
      throw new Error(error);//return thunkAPI.rejectWithValue(error);
		}
	};

	/**
	 * login
	 * @params {email, password}
	 */
	const onLogin = async (userData) => {
		try {
			authenticate("login", userData);
		} catch (error) {
			throw new Error(error);
		}
	};

	/**
	 * logout
	 * @params none
	 */
	const onLogout = async () => {
		try {
			await signOut(auth);
			console.log("logout>>");
		} catch (error) {
			const msg = transformErrorMsg(error);
			throw new Error(error); //TODO:
		}
	};

	return {
		isAuthenticated,
		user,
		onRegister,
		onLogin,
		onLogout,
		setAuthed,
	};
};

export default useAuth;
