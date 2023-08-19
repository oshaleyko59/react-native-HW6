import { useSelector, useDispatch } from "react-redux";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from "firebase/auth";
import md5 from "md5";

import { auth } from "../firebase/config";
import { setIsAuthenticated } from "../store/auth/auth-slice";
import saveAuthor from "../utils/saveAuthor";
import handleError from "../helpers/handleError";
import transformErrorMsg from "../helpers/transformErrorMessage";

const updateUserProfile = async (name, email) => {
	const user = auth.currentUser;
		const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
			email
		)}?d=wavatar`;
		return updateProfile(user, { displayName: name, photoURL: gravatarUrl });
};

async function authenticate(mode, userData) {
	const { email, password, name } = userData;

	try {
		if (mode === "register") {
			await createUserWithEmailAndPassword(auth, email, password);
      await updateUserProfile(name, email);
      const user = auth.currentUser;
			saveAuthor(user.uid, user.displayName, user.photoURL);
		} else if (mode === "login") {
			await signInWithEmailAndPassword(auth, email, password);
		} else {
			throw new Error("DEV_ERR");
		}
	} catch (error) {
		const msg = transformErrorMsg(error);
    throw new Error(msg);
	}
}

const useAuth = () => {
  const dispatch = useDispatch();

	/**
	 * get user
	 * @params none
	 * returns current user object from  or null
	 */
  const user = auth.currentUser;

	/**
	 * get value isAuthenticated in store
	 * @params payload = true/false
	 */
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
			await authenticate("register", userData);
		} catch (error) {
			handleError("Register error", error);
		}
	};

	/**
	 * login
	 * @params {email, password}
	 */
	const onLogin = async (userData) => {
		try {
			await authenticate("login", userData);
		} catch (error) {
			handleError("Login error", error);
		}
	};

	/**
	 * logout
	 * @params none
	 */
	const onLogout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			handleError("logout/>>error", error);
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
