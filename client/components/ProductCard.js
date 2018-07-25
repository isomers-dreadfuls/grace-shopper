import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  return (
    <React.Fragment>
      <div>
        <Link to={`/products/${props.product.id}`}>{props.product.name}</Link>
        <h3>{props.product.description}</h3>
        <h3>{props.product.price}</h3>
      </div>
    </React.Fragment>
  )
}

export default ProductCard
