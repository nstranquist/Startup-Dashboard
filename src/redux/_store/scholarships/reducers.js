import { ScholarshipsState, ScholarshipActionTypes } from './types'

const initialState = {
  scholarships: [],
  filter: 'all',
  loading: false,
  errors: null
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'LOADING_SCHOLARSHIPS':
      return {
        ...state,
        loading: true
      }
    case 'SET_SCHOLARSHIPS':
      console.log('reduced getScholarships')
      return {
        ...state,
        scholarships: action.scholarships,
        loading: false,
        errors: null
      }
    case 'SET_SCHOLARSHIPS_FILTER':
      return {
        ...state,
        scholarships: [ // spread operator is only a shallow operation
          ...state.scholarships
        ],
        filter: action.filter
      }
    case 'TOGGLE_FAVORITE_SCHOLARSHIP':
      // find scholarship in array by id that needs to be toggled
      const newScholarships = state.scholarships.map(scholarship => {
        if(scholarship.index === action.index)
          scholarship.isFavorite = !scholarship.isFavorite  //toggles scholarship
        return scholarship
      })
      return {
        ...state,
        scholarships: newScholarships
      }
    case 'SET_SCHOLARSHIPS_ERROR':
      return {
        ...state,
        errors: action.err,
        loading: false
      }
    default:
      return state
  }
}
