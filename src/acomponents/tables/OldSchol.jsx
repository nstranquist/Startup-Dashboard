import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { firestore } from '../../utils/firebaseHelper'

const ScholarshipsList = () => {

  useEffect(() => (
    console.log('at use effect')
    // call firestore data with the sdk
    // firestore
    //   .collection('scholarships')
    //   .get()
    //   .then(snap => {
    //     snap.docs.forEach((scholarship) => {
    //       console.log('scholarship:', scholarship.data())
    //     })
    //   })
    //   .catch(err => console.log(err))
  ), [])  // called once on data load

  return (
    <div>
      Scholarships
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.myapp.profile,
  scholarships: state.myapp.scholarships,
})

export default connect(
  mapStateToProps,
  {  }
)(ScholarshipsList)
