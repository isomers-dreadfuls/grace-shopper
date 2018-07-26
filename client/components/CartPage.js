import React from 'react'
import {connect} from 'react-redux'
import {ProductRow, CartSummary} from './index'

class CartPage extends React.Component {
  render() {
    return (
      <div id="cart-page-container">
        <div id="product-rows-container">
          {this.props.cart.map(product => (
            <ProductRow key={product.id} product={product} />
          ))}
        </div>
        <div id="cart-summary-container">
          <CartSummary cart={this.props.cart} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(CartPage)
