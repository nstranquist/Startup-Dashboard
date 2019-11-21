import { auth, firestore } from '../../../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import history from '../../../../utils/history'
//import getNotificationToken from '../utils/getNotificationToken'

// auth/user actions
export const attemptLogin = (email, password, history) => (dispatch) => {
  console.log('begin signing in attempt')
  //if(auth.currentUser!.uid) {
  //  console.log('You are already logged in. Stop.')
  //  console.log('your id:', auth.currentUser!.uid)
  //  return
  //}
  dispatch({ type: 'LOADING_AUTH' })
  console.log('email:', email)
  auth
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      console.log('signin successful with data: ', data)
      dispatch({ type: 'AUTHENTICATE' })
      history.push("/dashboard");
    })
    .catch((err) => {
      console.log('signin error: ', err.message)
      dispatch({ type: 'SET_AUTH_ERROR', err})
      //alert("Oops. Invalid log in.");
    })
}
export const logout = () => (dispatch) => {
  console.log('begin logout')
  auth
    .signOut()
    .then(() => {
      console.log('signout success')
      dispatch({ type: 'UNAUTHENTICATE' })
    })
    .catch(err => console.log('signout error: ', err))
}
export const attemptSignup = (email, password, firstName, lastName, history) => (dispatch) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCreds) => {
      auth.currentUser.sendEmailVerification()
      dispatch({ type: 'LOADING_AUTH' })
      console.log('signup successful with data: ', userCreds)
      dispatch({ type: 'AUTHENTICATE' })

      // set token?
      // create /profiles in collection
      const profileRef = firestore.doc(`/profiles/${userCreds.user.uid}/`)
      profileRef
        .set({ 
          uid: userCreds.user.uid,
          firstName,
          lastName
         })
         .then(() => history.push('/dashboard'))
        .catch(err => console.log(err))
    })
    // TODO: make survey
    .catch(err => {
      dispatch({ type: 'SET_AUTH_ERROR', err})
      console.log('signup failed: ', err)
    })
}

/*
const setAuthorizationHeader = (token: string) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
*/