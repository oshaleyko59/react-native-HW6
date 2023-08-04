import React from 'react';
import {onAuthStateChanged, User } from 'firebase/auth';
import { useSelector, useDispatch } from "react-redux";

import authSelectors from '../store/auth/auth-selectors';
import authOperations from '../store/auth/authOperations';
import { auth } from '../firebase/config';

/* export function useAuthentication() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
} */
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
}
export default useAuth;
