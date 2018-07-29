import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, getProduct} from '../store/product'
import {ReviewsList} from './index'
import {addToUserCart} from '../store/cart'
import {Grid, Button} from 'semantic-ui-react'

class ProductPage extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: NaN,
      purchase: 'false'
    }
    this.addToCartButton = this.addToCartButton.bind(this)
    this.handleSizeChange = this.handleSizeChange.bind(this)
    this.sizeCheck = this.sizeCheck.bind(this)
    this.buttonCheck = this.buttonCheck.bind(this)
  }
  componentDidMount() {
    this.props.fetchProduct()
  }
  componentWillUnmount() {
    this.props.unMountProduct()
  }
  handleSizeChange(event) {
    if (event.target.value !== '') {
      let newQuantity = this.props.inventories.filter(prod => {
        return prod.id === +event.target.value
      })[0].quantity
      this.setState({
        quantity: newQuantity,
        purchase: 'false'
      })
    } else {
      this.setState({quantity: NaN})
    }
  }
  sizeCheck() {
    switch (true) {
      case this.state.quantity === 0:
        return <h4>This size is out of stock</h4>
      case this.state.quantity === 1:
        return <h4>There is only 1 left in this size!</h4>
      case this.state.quantity <= 20:
        return <h4>There are only {this.state.quantity} left in this size!</h4>
      default:
        return null
    }
  }
  buttonCheck() {
    switch (true) {
      case this.state.purchase === 'complete':
        return <Button positive>Added!</Button>
      case this.state.purchase === 'loading':
        return (
          <Button loading primary>
            Loading
          </Button>
        )

      default:
        return (
          <Button primary type="submit">
            Add to Cart
          </Button>
        )
    }
  }
  async addToCartButton(event) {
    event.preventDefault()
    this.setState({purchase: 'loading'})
    await this.props.addToUserCart({
      userId: this.props.user.id,
      inventoryId: event.target.sizeSelector.value,
      quantity: event.target.quantitySelector.value
    })
    setTimeout(() => {
      this.setState({purchase: 'complete'})
    }, 500)
  }
  render() {
    const singleProduct = this.props.singleProduct
    const inventories = this.props.inventories
    const maxQuantity = Math.min(this.state.quantity, 10)
    const quantity = []
    for (let i = 1; i <= maxQuantity; i++) {
      quantity.push(i)
    }
    return (
      <div id="product-page-container">
        <Grid columns={2}>
          <Grid.Column>
            <img style={{height: '500px'}} src={singleProduct.image} />
          </Grid.Column>
          <Grid.Column>
            <div id="product-page-info">
              <h2>{singleProduct.name}</h2>
              <h3>${singleProduct.price}</h3>
              <form onSubmit={this.addToCartButton}>
                <h3>Size</h3>
                {this.sizeCheck()}
                <select name="sizeSelector" onChange={this.handleSizeChange}>
                  <option value="" key={0}>
                    Choose Size
                  </option>
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
                  {quantity.map(num => {
                    return (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    )
                  })}
                </select>
                {this.buttonCheck()}
              </form>
              <h4>{singleProduct.description}</h4>
            </div>
          </Grid.Column>
        </Grid>
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
    unMountProduct: () => {
      dispatch(getProduct({}))
    },
    addToUserCart: ids => {
      dispatch(addToUserCart(ids))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
