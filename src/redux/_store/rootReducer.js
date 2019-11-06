// root reducer

import { combineReducers } from 'redux'
// reducers
import profileReducer from './profileContainer'
import scholarships from './scholarships/reducers'


const rootApp = combineReducers({
  profile: profileReducer,  // combines auth, userData, and ...
  scholarships
})

export default rootApp

//export type RootState = ReturnType<typeof rootApp>