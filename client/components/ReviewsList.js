import React from 'react'
import {connect} from 'react-redux'
import {ReviewCard} from './index'

class ReviewsList extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.allReviews.map(review => {
          return <ReviewCard key={review.id} review={review} />
        })}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    allReviews: state.product.singleProduct.reviews || []
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList)
