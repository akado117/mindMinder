import { AppDispatch, dispatch as appDispatch } from '../store/store';
import { LoginCredentials, SignupFields, setIsAuthenticated, setAuthError, setAuthLoading, setUser } from '../store/authSlice';
import { auth, firestore, fb } from './firebase'

import api from '../api/client';

auth.onAuthStateChanged(userAuth => {
  if (userAuth) {
    appDispatch(setIsAuthenticated(true));
  } else {
    appDispatch(setIsAuthenticated(false));
  }
});

export const createAccount = (createCreds: SignupFields) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(""));

    const username = createCreds.username.toLowerCase();
    const email = createCreds.email.toLowerCase();

    

    

    try {
        const usernameSubmissionRef = firestore
      .collection('username-submissions')
      .doc(username.toLowerCase())

    // For this to work, the Firestore rules also check to make sure the usernames
    // collection does not contain the submitted username
    await usernameSubmissionRef.set({
      created: fb.firestore.FieldValue.serverTimestamp(),
      email: email.toLowerCase(),
      username: username.toLowerCase()
    })

      const userCred = await auth.createUserWithEmailAndPassword(email, createCreds.password)
      await userCred.user?.updateProfile({ displayName: username })


      dispatch(setUser(userCred))
      return Promise.resolve(userCred)
    } catch (error) {
      const code = error.code

      dispatch(setAuthError(code))

      return Promise.reject(error)
    }
  }
}



export const login = (loginCreds: LoginCredentials) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    api
      .post('/api/sessions', { session: loginCreds })
      .then((_response) => {
        dispatch(setAuthLoading(false));
        dispatch(setIsAuthenticated(true));
      })
      .catch((e) => {
        dispatch(setAuthLoading(false));
        dispatch(setIsAuthenticated(false));
        // Report error to common error notification reducer?
        dispatch(setAuthError(e.message));
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    auth.signOut().finally(() => {
      dispatch(setAuthLoading(false));
    })
  }
}

export const logoutRaw = async () => {
  return auth.signOut()
}


export default {
  login,
  logout,
  logoutRaw
}
