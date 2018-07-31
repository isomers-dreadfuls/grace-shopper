import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import {Link} from 'react-router-dom'
import {Dimmer, Loader} from 'semantic-ui-react'
import {CartSummary} from './index'
import {connect} from 'react-redux'
import {checkout} from '../store/cart'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      complete: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({loading: true})
    try {
      const {token} = await this.props.stripe.createToken({name: 'Brian Kim'})
      await this.props.checkout({
        id: token.id,
        userId: this.props.user.id,
        cart: this.props.cart
      })
      this.setState({complete: true, loading: false})
    } catch (error) {
      this.setState({loading: false})
      console.log(error)
    }
  }

  render() {
    return this.state.complete ? (
      <div>
        <h3>Purchase Complete!</h3>
        <Link to="/products" className="item">
          Click here to buy more items!
        </Link>
      </div>
    ) : (
      <div id="payment-container">
        <Dimmer className="loading" active={this.state.loading}>
          <Loader>Loading</Loader>
        </Dimmer>
        <CartSummary cart={this.props.cart} />
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Card Details</h3>
            <CardElement />
          </label>
          <button type="submit">Confirm Order</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkout: info => dispatch(checkout(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  injectStripe(CheckoutForm)
)
