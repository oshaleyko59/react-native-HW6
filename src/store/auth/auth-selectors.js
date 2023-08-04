const selectIsAuthenticated = (state) => {
/*   console.debug(
		"selectIsAuthenticated>>",
		!!state.auth.token,
		!state.auth.token,
		state.auth.token
	); */
  return !!state.auth.token;
};
const selectUser = (state) => state.auth.user;

const selectIsRefreshing = (state) => state.auth.isRefreshingUser;
const selectErrorMsg = (state) => state.auth.errorMsg;

const selectToken = (state) => state.auth.token; //TODO: remove ?

const authSelectors = {
	selectIsAuthenticated,
	selectUser,
	selectIsRefreshing,
	selectErrorMsg,
	selectToken,
};
export default authSelectors;
