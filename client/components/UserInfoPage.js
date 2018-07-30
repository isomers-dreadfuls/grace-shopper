import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from "../store"
import {Link} from 'react-router-dom'

class UserInfoPage extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id)
  }
  
  render() {
    const user = this.props.user
    return (
      <div>
        <div>
          {(user.firstName)?(<h2>Welcome {user.firstName}</h2>):(<h2>Welcome User!</h2>)}
          <div>
            <h3>Account Info</h3>
            <p>name: {user.firstName +  " " + user.lastName}</p>
            <p>email: {user.email}</p>
          </div>
          <div>
            <h3>Addresses and Payments</h3>
            <p>User Shipping Address: {user.userAddress + " " + user.userCity + ", " + user.userState + " " + user.userZip} </p>
          </div>
        </div>
       <button><Link to={`/users/${user.id}/edit`}>Edit Info</Link></button>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: (userId) => {
      dispatch(fetchSingleUser(userId));
    }
  }
}

const connectedUserInfoPage = connect(mapStateToProps,mapDispatchToProps);

export default connectedUserInfoPage(UserInfoPage)
