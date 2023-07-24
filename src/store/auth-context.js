import { createContext, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
	isAuthenticated: false,
	authenticate: (user) => {},
	logout: () => {},
	getUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	function getUser() {
		return user;
	}

	function validateEmail(email) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return true;
		}

		alert("You have entered an invalid email address!");
		return false;
	}

	function validatePassword(password) {
		return password.length > 6;
	}

	function validate(user) {
		//TODO:  move to inputs?
		let { name, email, password } = user;
		if (email) email = email.trim();
		if (name) name = name.trim();
		if (password) password = password.trim();

		if (
			!user ||
			!validateEmail(email) ||
			(password && !validatePassword(password))
		) {
			console.error(`User ${JSON.stringify(user)} is not validated!`);
			throw new Error("ERROR");
		}
		return { name, email, password };
	}

	async function authenticate(user) {
		try {
			const credentials = validate(user);
			credentials.password = "";
			setUser(credentials);
			await AsyncStorage.setItem("user", JSON.stringify(credentials));

			return credentials;
		} catch (e) {
			setUser(null);
			throw new Error(`User ${JSON.stringify(user)} not authenticated!`);
		}
	}

	async function logout() {
		setUser(null);
		try {
			await AsyncStorage.removeItem("user");
		} catch (e) {
			console.error(e.message);
		}
	}

	const value = {
		isAuthenticated: !!user, //make it real true
		authenticate,
		logout,
		getUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
