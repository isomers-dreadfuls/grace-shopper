import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, getProduct} from '../store/product'
import {ReviewsList} from './index'
import {addToUserCart} from '../store/cart'
import {Grid, Button, Tab} from 'semantic-ui-react'

class ProductPage extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: NaN,
      purchase: 'disabled'
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
  // function that changes the maximum quantity of item that can be purchased, based on the currently selected size
  // it also resets the purchase state to 'false'
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
      // if no size is selected (ie. the 'Choose Size' option), then disable the purchase button
      this.setState({quantity: NaN, purchase: 'disabled'})
    }
  }
  // function that displays different message depending on quantity of inventory in stock
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
  // function that displays different submit button depending on status of purchase
  buttonCheck() {
    switch (true) {
      case this.state.purchase === 'complete':
        return (
          <Button style={{width: '80%'}} positive>
            Added!
          </Button>
        )
      case this.state.purchase === 'disabled':
        return (
          <Button disabled style={{width: '80%'}} primary>
            Add to Cart
          </Button>
        )
      case this.state.purchase === 'loading':
        return (
          <Button style={{width: '80%'}} loading primary>
            Loading
          </Button>
        )

      default:
        return (
          <Button style={{width: '80%'}} primary type="submit">
            Add to Cart
          </Button>
        )
    }
  }
  // event to add item to cart
  // currently using a setTimeout of 0.5 seconds to give feedback to user after they press it
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
    const panes = [
      {
        menuItem: 'Description',
        render: () => <Tab.Pane>{singleProduct.description}</Tab.Pane>
      },
      {
        menuItem: 'Sizing',
        render: () => (
          <Tab.Pane>
            If you are small, order a small.
            <br />
            If you are medium, order a medium.
            <br />
            If you are large, order a large.
            <br />
            If you are unsure, order all three.
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Return Policy',
        render: () => (
          <Tab.Pane>
            If you are unhappy with your sweater purchase, you are out of luck.
            <br />
            At this time, we will not give refunds for any of our products.
            <br />
            All sales are final.
          </Tab.Pane>
        )
      }
    ]
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
                <select
                  style={{width: '80%'}}
                  name="sizeSelector"
                  onChange={this.handleSizeChange}
                >
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
                <select style={{width: '40%'}} name="quantitySelector">
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
              <Tab
                menu={{secondary: true, pointing: true}}
                style={{width: '80%'}}
                panes={panes}
              />
            </div>
          </Grid.Column>
        </Grid>
        <ReviewsList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const singleProduct = state.product.singleProduct || {}
  return {
    user: state.user,
    singleProduct: singleProduct,
    inventories: singleProduct.inventories || []
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
