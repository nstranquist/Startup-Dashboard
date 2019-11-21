import React from 'react'
import { connect } from 'react-redux'
import { firestore } from '../../utils/firebaseHelper'


/* scholarship Item schema:
  1) name
  2) major(s)
  3) website
  4) amount
  5) requirements
  6) address
  7) contact
*/

class ScholarshipsList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scholarships: []
    }
  }

  componentDidMount() {
    console.log('at schol mount')
    firestore
      .collection('scholarships')
      .get()
      .then(snap => {
        let newScholarships = []
        snap.docs.map((scholarship) => {
          console.log('mapped', scholarship.id)
          const newItem = {
            id: scholarship.id,
            name: scholarship.data().name,
            majors: scholarship.data().majors,
            amount: scholarship.data().amount,
            website: scholarship.data().website,
          }
          newScholarships.push(newItem)
        })
        return newScholarships
      })
      .then((newScholarships) => {
        console.log('new schols:', newScholarships)
        this.setState({
          scholarships: newScholarships
        }, console.log(this.state.scholarships))
      })
      .catch(err => console.log(err))
  }
    // call firestore data with the sdk
    
  render() {
    return (
      <div>
        <h1>Browse Scholarships</h1>
        <ul>
          {/* error check */}
          {this.state.scholarships.map(item => (
            <li key={item.id}>
              <div>Name: {item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.myapp.profile,
  scholarships: state.myapp.scholarships,
})

export default connect(
  mapStateToProps,
  {  }
)(ScholarshipsList)
