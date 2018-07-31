import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import {Dimmer, Loader, Modal, Button} from 'semantic-ui-react'
import {CartSummary} from './index'
import {connect} from 'react-redux'
import {checkout} from '../store/cart'
import history from '../history'

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
    return (
      <React.Fragment>
        <Modal dimmer="blurring" open={this.state.complete}>
          <Modal.Header>Purchase Complete!</Modal.Header>
          <Modal.Actions>
            <Button
              positive
              onClick={() => {
                history.push('/products')
              }}
            >
              Click here to buy more sweaters!
            </Button>
          </Modal.Actions>
        </Modal>
        <div id="payment-container">
          <Dimmer
            dimmer="blurring"
            className="loading"
            active={this.state.loading}
          >
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
      </React.Fragment>
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
