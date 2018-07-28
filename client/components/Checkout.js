import React from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements'
import InjectedCheckoutForm from './CheckoutForm'

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {stripe: null}
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_PdTJvVNpt0qPtWbaasT8BAYN')})
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe('pk_test_PdTJvVNpt0qPtWbaasT8BAYN')
        })
      })
    }
  }
  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    )
  }
}

export default Checkout
