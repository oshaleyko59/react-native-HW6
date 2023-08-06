import { useSelector, useDispatch } from "react-redux";

import authSelectors from "../store/auth/auth-selectors";
import authOperations from "../store/auth/authOperations";

const useAuth = () => {
	const isAuthenticated = useSelector(authSelectors.selectIsAuthenticated);
	const user = useSelector(authSelectors.selectUser);
	const errorMsg = useSelector(authSelectors.selectErrorMsg);
	const dispatch = useDispatch();
	const onLogout = () => dispatch(authOperations.logout());
	return {
		isAuthenticated,
		user,
		errorMsg,
		onLogout,
	};
};
export default useAuth;


//const isRefreshingUser = useSelector(authSelectors.selectIsRefreshing);
/*   const user = (() => {
    if (!auth.currentUser) { return null; };
    const { uid, displayName, photoURL} = auth.currentUser;
		//const { accessToken } = stsTokenManager;			token: accessToken,, stsTokenManager
		return {
			uid, email, displayName, photoURL
    };
  })();   */
//const token = useSelector(authSelectors.selectToken);
//
