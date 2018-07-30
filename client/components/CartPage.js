import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ProductRow, CartSummary} from './index'
import {Grid} from 'semantic-ui-react'

class CartPage extends React.Component {
  render() {
    return this.props.cart.length === 0 ? (
      <div id="cart-page-container">
        <React.Fragment>
          <h2>Cart</h2>
          <Link to="/products" className="item">
            Your cart is empty. Click here to take a look at our products!
          </Link>
        </React.Fragment>
      </div>
    ) : (
      <Grid columns={2} id="cart-page-container">
        <Grid.Column width={12}>
          <h2>Cart</h2>
          <Grid columns={4}>
            {this.props.cart.map(product => (
              <ProductRow key={product.id} product={product} />
            ))}
          </Grid>
        </Grid.Column>
        <Grid.Column width={3} id="cart-summary-container">
          <CartSummary cart={this.props.cart} />
          <Link to="/checkout">Checkout</Link>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CartPage)
