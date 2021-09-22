import { AppDispatch, dispatch as appDispatch } from '../store/store';
import { LoginCredentials, SignupFields, setIsAuthenticated, setAuthError, setAuthLoading, setUser, setProfile, setIsInitialized } from '../store/authSlice';
import { auth, firestore, fb } from './firebase'
import { documentExists } from '../utils'
import pRetry from 'p-retry'
import { Profile } from './types';

auth.onAuthStateChanged(async userAuth => {
  if (userAuth) {
    appDispatch(setIsInitialized(true));
    appDispatch(setIsAuthenticated(true));

    const profileRef = await firestore.collection('users').doc(userAuth.uid).collection('profile').doc('public')
    const profileDoc = await pRetry(() => documentExists(profileRef), { retries: 5 })
   
    if (profileDoc) {
      const profile = profileDoc.data() as Profile
      appDispatch(setProfile(profile))
    }
  } else {
    appDispatch(setIsInitialized(true));
    appDispatch(setIsAuthenticated(false))
  }
})

export const createAccount = (createCreds: SignupFields) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    const username = createCreds.username.toLowerCase();
    const email = createCreds.email.toLowerCase();
    try {
        const usernameSubmissionRef = firestore
      .collection('username-submissions')
      .doc(username)

    // For this to work, the Firestore rules also check to make sure the usernames
    // collection does not contain the submitted username
    await usernameSubmissionRef.set({
      created: fb.firestore.FieldValue.serverTimestamp(),
      email,
      username
    })

      const userCred = await auth.createUserWithEmailAndPassword(email, createCreds.password)
      await userCred.user?.updateProfile({ displayName: createCreds.username })

      dispatch(setUser(userCred))
      return userCred
    } catch ({code, message}) {
      dispatch(setAuthError({code, message}))
    } finally {
      dispatch(setAuthLoading(false));
    }
  }
}

export const login = (loginCreds: LoginCredentials) => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    auth.signInWithEmailAndPassword(loginCreds.email, loginCreds.password).then((userCred) => {
      dispatch(setUser(userCred));
      dispatch(setIsAuthenticated(true));
    }).catch((error) => {
      dispatch(setAuthError(error))
    }).finally(() => {
      dispatch(setAuthLoading(false));
    })
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthLoading(true));
    auth.signOut().then(() => {
      dispatch(setIsAuthenticated(false));
    }).finally(() => {
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
  logoutRaw,
}
