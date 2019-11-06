
import { UserDataState, UserDataTypes } from './types'

const initialUserDataState = {
  myScholarships: [],
  matchedScholarships: [],
  mySchools: [],
  //matchedSchools: [],
  school: '',
  email: '',
  name: '',
  loadingUserData: false,
  loadingUserStaticData: false,
  errors: null,
}

export default (
  state = initialUserDataState,
  action
) => {
  switch(action.type) {
    case 'UNAUTHENTICATE_PROFILE':
      return initialUserDataState
    case 'LOADING_USER_DATA':
      return {
        ...state,
        loadingUserData: true,
        errors: null
      }
    case 'LOADING_USER_STATIC_DATA':
      return {
        ...state,
        loadingUserStaticData: true,
        errors: null
      }
    // this is the real-time data
    case 'SET_USER_DATA':
      console.log('setting user realtime data')
      return {
        ...state,
        mySchools: action.mySchools,
        myScholarships: action.myScholarships,
        matchedScholarships: action.matchedScholarships,
        loadingUserData: false
      }
      // this is static data
      case 'SET_USER_PRIVATE_DATA':
        console.log('setting user static data')
        return {
          ...state,
          school: action.school,
          loadingUserStaticData: false,
          errors: null,
        }
    case 'TOGGLE_FAVORITE_SCHOLARSHIP':
      // add action.id to myScholarships
      return {
        ...state,
      }
    case 'TOGGLE_FAVORITE_SCHOOL':
      // add action.id to mySchools
      return {
        ...state,
      }
    case 'SET_USER_DATA_ERROR':
      return {
        ...state,
        errors: action.err
      }
    default:
      return state
  }
}
