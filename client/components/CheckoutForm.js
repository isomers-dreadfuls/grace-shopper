import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const token = await this.props.stripe.createToken({name: 'Brian Kim'})
    console.log('Received Stripe token:', token)
  }

  render() {
    return (
      <div id="payment-container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <h3>Card Details</h3>
            <CardElement />
          </label>
          <button type="button">Confirm Order</button>
        </form>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
