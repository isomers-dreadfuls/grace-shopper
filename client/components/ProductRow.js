import React from 'react'

const ProductRow = props => {
  return (
    <React.Fragment>
      <img src={props.product.inventory.product.image} />
      <div>
        <h3>{props.product.inventory.product.name}</h3>
        <h4>{props.product.inventory.product.description}</h4>
      </div>
      <h4>{props.product.inventory.product.price}</h4>
      <form>
        <div>
          <button type="submit">^</button>
          <button type="submit">v</button>
        </div>
        <selector>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
            return (
              <option value={num} key={num}>
                {num}
              </option>
            )
          })}
        </selector>
      </form>
    </React.Fragment>
  )
}

export default ProductRow
