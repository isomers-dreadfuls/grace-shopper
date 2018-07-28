import React from 'react'
import axios from 'axios'
import {injectStripe, CardElement} from 'react-stripe-elements'
import {Link} from 'react-router-dom'

class CheckoutForm extends React.Component {
  constructor() {
    super()
    this.state = {
      complete: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {token} = await this.props.stripe.createToken({name: 'Brian Kim'})
    console.log(token)
    await axios.post('/api/stripe', {id: token.id})
    this.setState({complete: true})
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

export default injectStripe(CheckoutForm)
