// action creators, thunk actions (async), and reducers all in the same file
import { auth, firestore } from '../../../utils/firebaseHelper'

// redux thunk
export const createApplication = (text) => (dispatch, getState) => {  // schol_id, title
  console.log('at the createApp thunk with text:', text)
  dispatch({ type: 'LOADING' })
  // make firebase api call
  firestore
    .collection('applications')
    .add({
      text,
      uid: auth.currentUser.uid
      //schol_id,
      //title,
    })
    .then((docRef) => {
      console.log('created doc:', docRef)
      let application = {
        id: docRef.id,
        text,
      }
      dispatch({ type: 'ADD_APPLICATION', application })
      return docRef.id
    })
    .then((id) => {
      // get current applications from store,
      let applications = getState().myapp.profile.userData.myApplications // might want to use a redux selector
      // update by pushing id to applications array (stored in new variable)
      applications.push(id)
      // assign firebase applications[] to the new variable
      firestore
        .doc(`profiles/${auth.currentUser.uid}`)
        .update({
          myApplications: applications
        })
        .then(() => console.log('successfully updated user application documents'))
        .catch(err => console.log(err))
      //dispatch({ type: 'ADD_USER_APPLICATION', id: docRef.id})
    })
    .catch(err => console.log(err))
}
export const deleteApplication = (id) => (dispatch) => {
  console.log('deleting application')
  firestore
    .doc(`applications/${id}`)
    .delete()
    .then(() => {
      dispatch({ type: 'DELETE_APPLICATION', id })
    })
    .catch(err => console.log(err))
}

// initial reducer state
const initialState = {
  loading: false,
  essays: [],  // [] when ready
  errors: null
}

// reducer
export const applicationReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'ADD_APPLICATION':
      let newEssays = state.essays
      newEssays.push(action.application)
      return {
        ...state,
        essays: newEssays,
        loading: false,
        errors: null
      }
    case 'DELETE_APPLICATION':
      // array manipulation logic
      // .slice(start, end) returns new array
      let index = state.essays.findIndex(essay => essay.id === action.id)
      newEssays = state.essays
      newEssays.splice(index, 1)  // deletes 1 item in the array at the given index
      console.log('new essays from reducer:', newEssays)
      return {
        ...state,
        essays: newEssays
      }
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    default: {
      return state
    }
  }
}