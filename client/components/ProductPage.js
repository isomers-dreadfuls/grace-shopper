import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {ReviewsList} from './index'
import {addToUserCart} from '../store/cart'

class ProductPage extends React.Component {
  constructor() {
    super()
    this.addToCartButton = this.addToCartButton.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct()
  }
  addToCartButton(event) {
    event.preventDefault()
    this.props.addToUserCart({
      userId: this.props.user.id,
      inventoryId: event.target.sizeSelector.value,
      quantity: event.target.quantitySelector.value
    })
  }
  render() {
    const singleProduct = this.props.singleProduct
    const inventories = this.props.inventories
    return (
      <div id="product-page-container">
        <img src={singleProduct.image} />
        <div id="product-page-info">
          <h2>{singleProduct.name}</h2>
          <h3>${singleProduct.price}</h3>
          <form onSubmit={this.addToCartButton}>
            <h3>Size</h3>
            <select name="sizeSelector">
              <option value="" key={0} />
              {inventories.map(item => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.size}
                  </option>
                )
              })}
            </select>
            <h3>Quantity</h3>
            <select name="quantitySelector">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                )
              })}
            </select>
            <button type="submit">Add to Cart</button>
          </form>
          <h4>{singleProduct.description}</h4>
        </div>
        <ReviewsList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    singleProduct: state.product.singleProduct || {},
    inventories: state.product.singleProduct.inventories || []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProduct: () => {
      dispatch(fetchProduct(ownProps.match.params.productId))
    },
    addToUserCart: ids => {
      dispatch(addToUserCart(ids))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
