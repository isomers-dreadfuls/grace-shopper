import React from 'react'

const ReviewCard = props => {
  return (
    <React.Fragment>
      <div>
        <h4>{`${props.review.rating} / 5`}</h4>
        <h4>{props.review.reviewText}</h4>
        <h5>{props.review.user.email}</h5>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default ReviewCard
