import React from 'react'

const ProductRow = props => {
  return (
    <React.Fragment>
      <img src={props.product.inventory.product.image} />
      <div>
        <h3>{props.product.inventory.product.name}</h3>
        <h3>Size: {props.product.inventory.size}</h3>
        <h4>{props.product.inventory.product.description}</h4>
      </div>
      <h4>${props.product.inventory.product.price}</h4>
      <form>
        <div>
          <button type="submit">^</button>
          <button type="submit">v</button>
        </div>
        <select value={props.product.quantity}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
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

export default ProductRow
