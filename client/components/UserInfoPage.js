import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from "../store"
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
          {console.log(user)}
          {(user.firstName)?(<h2>Welcome {user.firstName}</h2>):(<h2>Welcome User!</h2>)}
          <div>
            <h3>Account Info</h3>
            <p>name: {user.fullName}</p>
            <p>email: {user.email}</p>
          </div>
          <div>
            <h3>Addresses and Payments</h3>
            <p>User Shipping Address: {user.userAddress + " " + user.userCity + ", " + user.userState + " " + user.userZip} </p>
          </div>
        </div>
        {/*EDIT PAGE BUTTON!!*/}
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
