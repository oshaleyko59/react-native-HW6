import { useSelector, useDispatch } from "react-redux";
import authSelectors from "../store/auth/auth-selectors";
import authOperations from "../utils/auth";

const useAuth = () => {
	const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);
	const isRefreshingUser = useSelector(authSelectors.selectIsRefreshing);
	const user = useSelector(authSelectors.selectUser);
	const errorMsg = useSelector(authSelectors.selectErrorMsg);
	const dispatch = useDispatch();
  const token = useSelector(authSelectors.selectToken);
	const refreshUser = () => dispatch(authOperations.fetchCurrentUser());
	const onLogout = () => dispatch(authOperations.logout());

	return {
		isAuthenticated,
		isRefreshingUser,
		user,
		errorMsg,
		onLogout,
		refreshUser,
	};
};

export default useAuth;
