import React from 'react'
import {Card} from 'semantic-ui-react'
import history from '../history'

const ProductCard = props => {
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          history.push(`/products/${props.product.id}`)
        }}
        image={props.product.image}
        header={props.product.name}
        meta={`$${props.product.price}`}
        description={props.product.description}
        extra={
          <button
            type="submit"
            onClick={event => {
              event.stopPropagation()
            }}
          >
            Add to Cart
          </button>
        }
      />
    </React.Fragment>
  )
}

export default ProductCard
