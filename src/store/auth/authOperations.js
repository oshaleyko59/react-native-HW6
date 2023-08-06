import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	signOut,
	AuthErrorCodes,
} from "firebase/auth";
import { auth } from "../../firebase/config";

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

//register
const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			return authenticate("register", userData);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);

//login
const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
	try {
		return authenticate("login", userData);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

const updateUserProfile = async (update) => {
		const user = auth.currentUser;
	// якщо такий користувач знайдений
	if (user) {
		// оновлюємо його профайл
			return updateProfile(user, update);
  }
  throw new Error("Unexpected_ERR: no current user");
};

async function authenticate(mode, userData) {
	const { email, password, name } = userData;
	try {
		let response;
		if (mode === "register") {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.debug(
				"authenticate>>userCredential",
				userCredential.user.email,
				userCredential.user.displayName
			);
      await updateUserProfile({ displayName: name });
      console.debug("auth.currentUser", auth.currentUser.displayName);
		} else if (mode === "login") {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.debug(
				"authenticate>>userCredential",
				userCredential.user.email,
				userCredential.user.displayName
			);
			response = userCredential.user;
		} else {
			throw new Error("DEV_ERR");
		}

		const { uid, displayName, photoURL, stsTokenManager } = auth.currentUser;
		const { accessToken } = stsTokenManager;
		const userInfo = {
			token: accessToken,
			user: { uid, email, displayName, photoURL },
		};
		return userInfo;
	} catch (error) {
		const msg = transformErrorMsg(error);
		console.log("auth/>>error", msg);
		throw new Error(msg);
	}
}

/**
 * logout
 */
const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await signOut(auth);
		console.log("logout>>");
		//token.remove();
		//	thunkAPI.dispatch(removeContacts());
	} catch (error) {
		const msg = transformErrorMsg(error);
		return thunkAPI.rejectWithValue(msg);
	}
});

const authOperations = {
	register,
	logout,
	login,
};
export default authOperations;


/* ******************* refresh User ********************
 * lookup firebase accout data
 */
/* const fetchCurrentUser = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		try {
			console.debug("auth/refresh>>");
			onAuthStateChanged(auth, (user) => {
				console.log("user>>", user);
			});
		} catch (error) {
			return thunkAPI.rejectWithValue(error); // FIXME:
		}
	}
); */
