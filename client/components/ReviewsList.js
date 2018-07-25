import React from 'react'
import {connect} from 'react-redux'
import {ReviewCard} from './index'
import {addNewReview} from '../store/product'

class ReviewsList extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addNewReview({
      rating: +event.target.rating.value,
      reviewText: event.target.reviewText.value,
      // NEED TO REVIEW
      // temporary userId as 1 if no user is selected
      userId: this.props.currentUser.id || 1,
      productId: this.props.singleProduct.id
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.props.allReviews.map(review => {
          return <ReviewCard key={review.id} review={review} />
        })}
        <form onSubmit={this.handleSubmit}>
          <span>
            <input type="radio" name="rating" id="str1" value="1" />
            <input type="radio" name="rating" id="str2" value="2" />
            <input type="radio" name="rating" id="str3" value="3" />
            <input type="radio" name="rating" id="str4" value="4" />
            <input type="radio" name="rating" id="str5" value="5" />
          </span>
          <textarea name="reviewText" />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const singleProduct = state.product.singleProduct || {}
  return {
    singleProduct: singleProduct,
    allReviews: singleProduct.reviews || [],
    currentUser: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewReview: newInfo => dispatch(addNewReview(newInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList)
