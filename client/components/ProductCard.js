import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  return (
    <React.Fragment>
      <div>
        <Link className="ui card" to={`/products/${props.product.id}`}>
          <img src={props.product.image} className="ui image" />
          <div className="content">
            <div className="header">{props.product.name}</div>
            <div className="meta">
              <h3>${props.product.price}</h3>
            </div>
            <div className="description">{props.product.description}</div>
          </div>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default ProductCard
