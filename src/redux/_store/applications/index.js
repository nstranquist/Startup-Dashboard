// action creators, thunk actions (async), and reducers all in the same file
import { auth, firestore } from '../../../utils/firebaseHelper'

// redux thunk
export const createApplication = (text) => (dispatch) => {  // schol_id, title
  console.log('at the createApp thunk with text:', text)
  dispatch({ type: 'LOADING' })
  // make firebase api call
  firestore
    .collection('applications')
    .add({
      text,
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
      newEssays = state.essays.slice(0, index).concat(state.essays.slice(index+1, state.essays.length-1))
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