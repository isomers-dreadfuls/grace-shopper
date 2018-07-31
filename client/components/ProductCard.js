import React from 'react'
import {Card, Image, Rating} from 'semantic-ui-react'
import history from '../history'
import {fetchProduct} from '../store/product'
import {connect} from 'react-redux'

const ProductCard = props => {
  const ratingArray = props.product.reviews || []
  const averageRating =
    ratingArray.reduce((sum, elem) => {
      return sum + elem.rating
    }, 0) / ratingArray.length
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          props.fetchProduct(props.product.id)
          history.push(`/products/${props.product.id}`)
        }}
      >
        <div style={{overflow: 'hidden', height: '20vw'}}>
          <Image src={props.product.image} size="medium" />
        </div>
        <Card.Content>
          <Card.Header>{props.product.name}</Card.Header>
          <Card.Meta>{`$${props.product.price}`}</Card.Meta>
          <Card.Meta>
            <Rating
              disabled
              icon="star"
              name="rating"
              rating={averageRating}
              maxRating={5}
            />
            | {props.product.reviews.length}
          </Card.Meta>
          <Card.Description>{props.product.description}</Card.Description>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchProduct: id => {
    dispatch(fetchProduct(id))
  }
})

export default connect(null, mapDispatchToProps)(ProductCard)
