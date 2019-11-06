
import { auth, firestore } from '../../../../utils/firebaseHelper'
import { Dispatch } from 'redux'

//export const getUserProfileData
//export const updateUserProfileData
//export const updateUserPrivateData (backend?)
export const getUserData = () => (dispatch) => {
  dispatch({ type: 'LOADING_USER_DATA' })
  console.log('user id (at getUserData):', auth.currentUser.uid)
  firestore
    .doc(`profiles/${auth.currentUser.uid}`)
    .onSnapshot(doc => {
      console.log('snapshot of userdata:', doc)
      console.log('doc data:', doc.data())
      dispatch({
        type: 'SET_USER_DATA',
        myScholarships: doc.data().myScholarships,
        mySchools: doc.data().mySchools,
        matchedScholarships: doc.data().matchedScholarships,
      })
    }, (err) => {
      console.log('error: ', err)
      dispatch({ type: 'SET_USER_DATA_ERROR', err })
    })
}
export const getUserPrivateData = () => (dispatch) => {
  dispatch({ type: 'LOADING_USER_STATIC_DATA' })
  firestore
    .doc(`profiles/${auth.currentUser.uid}`)
    .get()
    .then(doc => {
      console.log('user data:', doc.data())
      dispatch({
        type: 'SET_USER_PRIVATE_DATA',
        name: doc.data().name,
        email: doc.data().email,
        school: doc.data().school
      })
    })
    .catch(err => {
      dispatch({ type: 'SET_USER_DATA_ERROR', err })
      console.log(err)
    })
}
