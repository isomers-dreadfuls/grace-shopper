import React from 'react'
import {connect} from 'react-redux'
import {editUserCart, deleteFromUserCart} from '../store/cart'

const ProductRow = props => {
  const quantity = []
  for (let i = 1; i <= props.product.inventory.quantity; i++) {
    quantity.push(i)
  }
  return (
    <React.Fragment>
      <button
        type="submit"
        onClick={() => {
          props.deleteFromUserCart({
            userId: props.user.id,
            inventoryId: props.product.inventoryId
          })
        }}
      >
        Remove from Cart
      </button>
      <img src={props.product.inventory.product.image} />
      <div>
        <h3>{props.product.inventory.product.name}</h3>
        <h3>Size: {props.product.inventory.size}</h3>
        <h4>{props.product.inventory.product.description}</h4>
      </div>
      <h4>${props.product.inventory.product.price}</h4>
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
        <select name="quantitySelector" defaultValue={props.product.quantity}>
          {quantity.map(num => {
            return (
              <option value={num} key={num}>
                {num}
              </option>
            )
          })}
        </select>
        <button type="submit">Update</button>
      </form>
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
