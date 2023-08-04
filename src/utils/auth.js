import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
console.debug("API_KEY>>", API_KEY);

//******************* token helper ***********************
const token = {
	set(token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	},
	remove() {
		axios.defaults.headers.common.Authorization = "";
	},
};

const transformErrorMsg = ({ data, status, statusText }) => {
  console.log(`transformErrorMsg>>  ${status} ${statusText} ${data}`);
  //data, status, statusText
	return status;
};

async function authenticate(mode, email, password) {
	const response = await axios.post(
		`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
		{
			email,
			password,
			returnSecureToken: true,
		}
	);

	console.log("authenticate>>response.data", response.data);
	return response;
}

//TODO:
/* ****************** register new user **************************
 * После успешной регистрации => токен в HTTP-заголовок
*/
const register = createAsyncThunk(
	"auth/register",
  async (userData, thunkAPI) => {
    const { email, password } = userData;
    try {
			const { data } = await authenticate("signUp", email, password); //axios.post("/users/signup", userData);
			token.set(data.idToken);
			return data;
		} catch (error) {
			const msg = transformErrorMsg(error.response);
			return thunkAPI.rejectWithValue(msg);
		}
	}
);
/* ******************* refresh User ********************
 * lookup firebase accout data
 */
const fetchCurrentUser = createAsyncThunk(
	"auth/refresh",
  async (_, thunkAPI) => {
    return thunkAPI.rejectWithValue(msg); // FIXME:
		/* const state = thunkAPI.getState();
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

/* ************** login ***************
 * После успешного логина => токен в HTTP-заголовок
*/
const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  const { email, password } = credentials;
  console.debug("auth/login>>", email, password);
  try {
		const { data } = await authenticate("signInWithPassword", email, password); //await axios.post("/users/login", credentials);
		token.set(data.idToken);
		//TODO:		thunkAPI.dispatch(fetchContacts());
		return data;
  } catch (error) {
    console.log("auth/login>>error",error.response);// error,
		const msg = transformErrorMsg(error.response);
		return thunkAPI.rejectWithValue(msg);
	}
});

/* ********** logout from server and remove token from axios **********
 * POST @ /users/logout * headers: Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка  */
const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
	try {
		await axios.post("/users/logout");
		token.remove();
		//	thunkAPI.dispatch(removeContacts());
		//	thunkAPI.dispatch(setFilter(""));
	} catch (error) {
		const msg = transformErrorMsg(error.response);
		return thunkAPI.rejectWithValue(msg);
	}
});


const authOperations = {
	register,
	logout,
	login,
  fetchCurrentUser,
};
export default authOperations;
