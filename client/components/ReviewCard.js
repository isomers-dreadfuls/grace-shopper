import React from 'react'
import {Rating} from 'semantic-ui-react'

const ReviewCard = props => {
  return (
    <React.Fragment>
      <div className="ui red card">
        <div className="content">
          <Rating
            disabled
            icon="star"
            name="rating"
            rating={props.review.rating}
            maxRating={5}
          />
          <div className="description">{props.review.reviewText}</div>
          <div className="meta">{props.review.user.email}</div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ReviewCard
