const selectIsAuthenticated = (state) => !!state.auth.user;
const selectUser = (state) => state.auth.user;
const selectErrorMsg = (state) => state.auth.errorMsg;

const authSelectors = {
	selectIsAuthenticated,
	selectUser,
	selectErrorMsg,
};
export default authSelectors;

//const selectToken = (state) => state.auth.token; //TODO: remove ?
