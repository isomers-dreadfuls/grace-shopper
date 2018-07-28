import React from 'react'
import {connect} from 'react-redux'
import {ProductRow, CartSummary} from './index'
import {Grid} from 'semantic-ui-react'

class CartPage extends React.Component {
  render() {
    return (
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
