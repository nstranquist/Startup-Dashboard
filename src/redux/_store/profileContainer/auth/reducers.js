import { AuthState, AuthActionTypes } from './types'

// profile auth
const initialState = {
  isAuthenticated: false,
  loadingAuth: false,
  errors: null
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'LOADING_AUTH':
      return {
        ...state,
        loadingAuth: true,
        errors: null
      }
    case 'AUTHENTICATE':
      return {
        ...state,
        isAuthenticated: true,
        loadingAuth: false,
      }  
    case 'UNAUTHENTICATE':
      return initialState
    case 'SET_AUTH_ERROR':
      console.log('error with authentication')
      return {
        ...state,
        loadingAuth: false,
        errors: action.err,
      }
    default:
      return state
  }
}

