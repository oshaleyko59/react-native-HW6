import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const authStateChanged = async (onChange = () => {}) => {
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
			const msg = transformErrorMsg(error.response);
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
		const user = await auth.createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log("authRegister>>user", user);
	} catch (e) {
		console.error("authRegister>>error", e, e.message);
		const msg = transformErrorMsg(e.response);
		return thunkAPI.rejectWithValue(msg);
	}
});

/* //TODO: або більш короткий запис цієї функції
const registerDB = ({ email, password }) =>
        createUserWithEmailAndPassword(auth, email, password); */

//login
//const authLogin = async ({ email, password }) => {
  const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const { email, password } = credentials;
  console.debug("auth/login>>", email, password);
	try {
		const credentials = await signInWithEmailAndPassword(auth, email, password);
		console.log("authLogin>>credentials", credentials);
		return credentials.user;
	} catch (error) {
		console.log("auth/login>>error", error.response); // error,
		const msg = transformErrorMsg(error.response);
		return thunkAPI.rejectWithValue(msg);
	}
  });

/**
 * logout
 */
//TODO: ???
const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
    const response = await signOut(auth);
    console.log("logout>>credentials", response);
		token.remove();
		//	thunkAPI.dispatch(removeContacts());
		//	thunkAPI.dispatch(setFilter(""));
	} catch (error) {
		const msg = transformErrorMsg(error.response);
		return thunkAPI.rejectWithValue(msg);
	}
});

const updateUserProfile = async (update) => {
	const user = auth.currentUser;

	// якщо такий користувач знайдений
	if (user) {
		// оновлюємо його профайл
		try {
			await updateProfile(user, update);
		} catch (error) {
			throw error;
		}
	}
};

const authOperations = {
	register,
	logout,
	login,
	fetchCurrentUser,
};
export default authOperations;
