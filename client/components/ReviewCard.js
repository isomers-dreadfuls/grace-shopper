import React from 'react'

const ReviewCard = props => {
  return (
    <React.Fragment>
      <div className="ui red fluid card">
        <div className="content">
          <div className="header">{`${props.review.rating} / 5`}</div>
          <div className="meta">{props.review.user.email}</div>
          <div className="description">{props.review.reviewText}</div>
        </div>
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
