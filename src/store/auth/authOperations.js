import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	//onAuthStateChanged,
	updateProfile,
	signOut,
	AuthErrorCodes,
} from "firebase/auth";
import md5 from "md5";
import saveAuthor from "../../utils/saveAuthor";
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

const updateUserProfile = async (name, email) => {
	const user = auth.currentUser;
	if (user) {
		const gravatarUrl = `https://www.gravatar.com/avatar/${md5(
			email
		)}?d=wavatar`;
		return updateProfile(user, { displayName: name, photoURL: gravatarUrl });
	}
	throw new Error("Unexpected_ERR: no current user");
};

async function authenticate(mode, userData) {
  const { email, password, name } = userData;
  //console.log("auth/>>userData", userData);
	try {
		if (mode === "register") {
			await createUserWithEmailAndPassword(auth, email, password);
      await updateUserProfile(name, email);
    // console.log("auth/>>userInfo", userInfo);
    saveAuthor(uid, displayName, photoURL);
		} else if (mode === "login") {
			await signInWithEmailAndPassword(auth, email, password);
		} else {
			throw new Error("DEV_ERR");
		}
// common part:
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
		//	thunkAPI.dispatch(remove...());
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
			conso le.debug("auth/refresh>>");
			onAuthStateChanged(auth, (user) => {
				con sole.log("user>>", user);
			});
		} catch (error) {
			return thunkAPI.rejectWithValue(error); // FIXME:
		}
	}
); */
