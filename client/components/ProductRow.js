import React from 'react'
import {connect} from 'react-redux'
import {editUserCart, deleteFromUserCart} from '../store/cart'
import {Divider, Grid, Image, Header, Button} from 'semantic-ui-react'

const ProductRow = props => {
  const quantity = []
  for (let i = 1; i <= props.product.inventory.quantity; i++) {
    quantity.push(i)
  }
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image size="medium" src={props.product.inventory.product.image} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Header as="h3">{props.product.inventory.product.name}</Header>
          <Header as="h4">Size: {props.product.inventory.size}</Header>
          <Header as="h5">{props.product.inventory.product.description}</Header>
          <Button
            type="submit"
            onClick={() => {
              props.deleteFromUserCart({
                userId: props.user.id,
                inventoryId: props.product.inventoryId
              })
            }}
          >
            Remove from Cart
          </Button>
        </Grid.Column>
        <Grid.Column width={2}>
          <Header as="h4">${props.product.inventory.product.price}</Header>
        </Grid.Column>
        <Grid.Column width={2}>
          <form
            onSubmit={event => {
              event.preventDefault()
              props.editUserCart({
                userId: props.user.id,
                inventoryId: props.product.inventoryId,
                quantity: event.target.quantitySelector.value
              })
            }}
          >
            <select
              name="quantitySelector"
              defaultValue={props.product.quantity}
            >
              {quantity.map(num => {
                return (
                  <option value={num} key={num}>
                    {num}
                  </option>
                )
              })}
            </select>
            <Button type="submit">Update</Button>
          </form>
        </Grid.Column>
      </Grid.Row>
      <Divider />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  editUserCart: ids => {
    dispatch(editUserCart(ids))
  },
  deleteFromUserCart: ids => {
    dispatch(deleteFromUserCart(ids))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductRow)
