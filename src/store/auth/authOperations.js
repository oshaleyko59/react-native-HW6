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

const onUserStateChanged = async (onChange = () => {}) => {
	onAuthStateChanged((user) => {
		onChange(user);
	});
};
/* ******************* refresh User ********************
 * lookup firebase accout data
 */
const fetchCurrentUser = createAsyncThunk(
	"auth/refresh",
	async (_, thunkAPI) => {
		return thunkAPI.rejectWithValue(msg); // FIXME:
		/* 		const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    token.set(persistedToken);

		try {
      const {data} = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:${lookup}?key=${API_KEY}`,
				{
					idToken: persistedToken,
				}
			);
      console.debug("fetchCurrentUser>>data", data);
			//thunkAPI.dispatch(fetchContacts());
			return data;
		} catch (error) {
			const msg = transformErrorMsg(error);
			return thunkAPI.rejectWithValue(msg);
		} */
	}
);

//register
//export const authRegister = async ({ email, password }) => {
const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		const { email, password } = userData;
    try {
      return authenticate("register", email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }

	}
);

async function authenticate(mode, email, password) {
	try {
		let response;
		if (mode === "register") {
			response = await createUserWithEmailAndPassword(auth, email, password);
		} else if (mode === "login") {
			response = await signInWithEmailAndPassword(auth, email, password);
		} else {
			throw new Error("DEV_ERR");
		}

		const { uid, displayName, photoURL, stsTokenManager } = response.user;
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

//login
//const authLogin = async ({ email, password }) => {
const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const { email, password } = credentials;
    try {
			return authenticate("login", email, password);
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
});

/**
 * logout
 */
const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		const response = await signOut(auth);
		console.log("logout>>response", response);
		token.remove();
		//	thunkAPI.dispatch(removeContacts());
		//	thunkAPI.dispatch(setFilter(""));
	} catch (error) {
		const msg = transformErrorMsg(error);
		return thunkAPI.rejectWithValue(msg);
	}
});

const updateUserProfile = async (update) => {
	console.log("updateUserProfile>>response", "TODO");
	/* 	const user = auth.currentUser;

	// якщо такий користувач знайдений
	if (user) {
		// оновлюємо його профайл
		try {
			await updateProfile(user, update);
		} catch (error) {
			throw error;
		}
	} */
};

const authOperations = {
	register,
	logout,
	login,
	fetchCurrentUser,
	onUserStateChanged,
};
export default authOperations;
