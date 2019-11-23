// root reducer

import { combineReducers } from 'redux'
// reducers
import profileReducer from './profileContainer'
import scholarships from './scholarships/reducers'
import { applicationReducer } from './applications'


const rootApp = combineReducers({
  profile: profileReducer,  // combines auth, userData, and ...
  scholarships,
  applications: applicationReducer
})

export default rootApp

//export type RootState = ReturnType<typeof rootApp>