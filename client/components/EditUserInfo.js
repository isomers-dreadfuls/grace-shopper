import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUser} from "../store/user"

class EditUserInfo extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      userAddress: '',
      userCity: '',
      userState: '',
      userZip: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    console.log(this.props.user.id)
    this.props.update(this.state, this.props.user.id)
    this.props.history.push(`/users/${this.props.user.id}`)
  }

  render() {
    return(
      <React.Fragment>
        <h3>Edit Your Information!</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <p>Last Name</p>
              <input onChange={this.handleChange} type="text" name="lastName" value={this.state.lastName}/>
            </div>
            <div>
              <p>First Name</p>
              <input onChange={this.handleChange} type="text" name="firstName" value={this.state.firstName}/>
            </div>
          </div>
          <a>Your Address:</a>
          <div>
            <div>
              <p>Address</p>
              <input onChange={this.handleChange} type="text" name="userAddress" value={this.state.userAddress}/>
            </div>
            <div>
              <p>City</p>
              <input onChange={this.handleChange} type="text" name="userCity" value={this.state.userCity}/>
            </div>
            <div>
              <p>State</p>
              <input onChange={this.handleChange} type="text" name="userState" value={this.state.userState}/>
            </div>
            <div>
              <p>Zip Code</p>
              <input onChange={this.handleChange} type="number" name="userZip" value={this.state.userZip}/>
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </React.Fragment>
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
    update: (updateInfo, userId) => {
      dispatch(updateUser(updateInfo, userId))
    }
  }
}

const connectedEditUserInfo = connect(mapStateToProps,mapDispatchToProps)

export default connectedEditUserInfo(EditUserInfo)