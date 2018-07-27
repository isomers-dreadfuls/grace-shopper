import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Dropdown, Menu} from 'semantic-ui-react'
import history from '../history'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const options = [
    {
      key: 1,
      text: 'View My Account',
      onClick: () => {
        history.push(`/user/${user.id}`)
      }
    },
    {
      key: 2,
      text: 'View Orders',
      onClick: () => {
        console.log('VIEW ORDERS')
      }
    },
    {
      key: 3,
      text: 'Log Out',
      onClick: handleClick
    }
  ]

  return (
    <nav>
      {isLoggedIn ? (
        <div id="navbar-container">
          {/* The navbar will show these links after you log in */}
          <div className="ui menu">
            <h1 id="navbar-name">Isomers</h1>
            <Link to="/" className="item">
              Home
            </Link>
            <Link to="/products" className="item">
              Products
            </Link>
            <Link to="/about-us" className="item">
              About Us
            </Link>
            <div className="right menu">
              <Link to="/cart" className="item">
                Cart
              </Link>
              <Dropdown text="My Account" options={options} simple item />
            </div>
          </div>
        </div>
      ) : (
        <div id="navbar-container">
          {/* The navbar will show these links before you log in */}
          <div className="ui menu">
            <h1 id="navbar-name">Isomers</h1>
            <Link to="/" className="item">
              Home
            </Link>
            <Link to="/products" className="item">
              Products
            </Link>
            <Link to="/about" className="item">
              About
            </Link>
            <div className="right menu">
              <Link to="/cart" className="item">
                Cart
              </Link>
              <Link to="/login" className="item">
                Login
              </Link>
              <Link to="/sign-up" className="item">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    state: state
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
