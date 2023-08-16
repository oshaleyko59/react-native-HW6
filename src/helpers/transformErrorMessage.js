const transformErrorMsg = (error) => {
	switch (error.code) {
		case "auth/user-not-found":
			return "Authentication failed!";
/* 		case AuthErrorCodes.INVALID_EMAIL:
			return "Invalid email";
		case AuthErrorCodes.INVALID_PASSWORD:
			return "Invalid password. Try again"; */
		default:
			return `${error.message}`;
	}
};

export default transformErrorMsg;
