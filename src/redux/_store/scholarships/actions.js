import { firestore } from '../../../utils/firebaseHelper'
import { Dispatch } from 'redux'
import { Scholarship } from '../rootTypes'

export const getScholarships = () => (dispatch,  getState) => {
  console.log('dispatching getScholarships')
  dispatch({ type: 'LOADING_SCHOLARSHIPS' })
  firestore
    .collection('rawScholarships')
    .orderBy('index')
    .get()
    .then((snap) => {
      let scholarshipsResponse = []
      snap.docs.map(scholarship => {
        scholarshipsResponse.push({
          index: scholarship.data().index,
          name: scholarship.data().name,
          description: scholarship.data().description,
          school: scholarship.data().school,
          majors: scholarship.data().majors,
          amount: scholarship.data().amount,
          requirements: scholarship.data().requirements,
          website: scholarship.data().website,
        })
      })
      // then add isFavorite flag to the scholarships from userData if signedin
      if(getState().profile.auth.isAuthenticated) { // can probably verify here in better ways
        let userFavoriteScholarships = getState().profile.userData.myScholarships
        if(userFavoriteScholarships) {
          scholarshipsResponse.map(scholarship => {
            scholarship.isFavorite = userFavoriteScholarships.includes(scholarship.index) ? true : false
          })
        } else console.log('your favorited scholarships were null')
      }
      dispatch({
        type: 'SET_SCHOLARSHIPS',
        scholarships: scholarshipsResponse
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: 'SET_SCHOLARSHIPS_ERROR', err})
    })
}

export const setScholarshipsFilter = (filter) => ({
  type: 'SET_SCHOLARSHIPS_FILTER',
  filter
})