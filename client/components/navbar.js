import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Dropdown, Menu, Label} from 'semantic-ui-react'
import history from '../history'
import {fetchAllProducts, setSearch} from '../store/product'

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
  const loginOptions = [
    {
      key: 1,
      text: 'Sign In',
      onClick: () => {
        history.push('/login')
      }
    },
    {
      key: 2,
      text: 'Create an Account',
      onClick: () => {
        history.push('/sign-up')
      }
    }
  ]
  const handleSubmit = event => {
    event.preventDefault()
    props.search(event.target.search.value)
    event.target.search.value = ''
    history.push('/products')
  }
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
              props.clearSearch()
              props.search()
              history.push('/products')
            }}
          >
            Sweaters
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              history.push('/about')
            }}
          >
            About Us
          </Menu.Item>
          <div className="right menu">
            <Menu.Item>
              <form onSubmit={handleSubmit}>
                <input type="text" name="search" />
                <button type="submit">Search</button>
              </form>
            </Menu.Item>
            {isLoggedIn ? (
              <Dropdown text="My Account" options={options} simple item />
            ) : (
              <Dropdown text="Sign In" options={loginOptions} simple item />
            )}
            <Menu.Item
              onClick={() => {
                history.push('/cart')
              }}
            >
              Cart<Label>{props.cart.length}</Label>
            </Menu.Item>
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
    },
    search: searchKey => {
      dispatch(fetchAllProducts(searchKey))
    },
    clearSearch: () => {
      dispatch(setSearch(''))
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
