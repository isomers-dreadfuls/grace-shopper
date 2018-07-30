import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Dropdown, Menu, Label} from 'semantic-ui-react'
import history from '../history'

const Navbar = props => {
  const {handleClick, isLoggedIn, user} = props
  const options = [
    {
      key: 1,
      text: 'View My Account',
      onClick: () => {
        history.push(`/users/${user.id}`)
      }
    },
    {
      key: 2,
      text: 'View Orders',
      onClick: () => {
        history.push(`/orders/${user.id}`)
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
      <div id="navbar-container">
        <div className="ui menu">
          <h1 id="navbar-name">Isomers</h1>
          <Menu.Item
            onClick={() => {
              history.push('/')
            }}
          >
            Home
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/products')
            }}
          >
            Products
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/about')
            }}
          >
            About Us
          </Menu.Item>
          <div className="right menu">
            <Menu.Item
              onClick={() => {
                history.push('/cart')
              }}
            >
              Cart<Label>{props.cart.length}</Label>
            </Menu.Item>
            {isLoggedIn ? (
              <Dropdown text="My Account" options={options} simple item />
            ) : (
              <React.Fragment>
                <Menu.Item
                  onClick={() => {
                    history.push('/login')
                  }}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    history.push('/sign-up')
                  }}
                >
                  Signup
                </Menu.Item>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
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
    state: state,
    cart: state.cart
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
