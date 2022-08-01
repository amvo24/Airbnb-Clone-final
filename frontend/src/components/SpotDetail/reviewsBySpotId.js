import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsByreviewId } from '../../store/review';
//import CreateReview from './createReview'
import { Link, useParams } from 'react-router-dom'
import './reviewsBySpotId.css'

const ReviewsBySpotId = ({id}) => {
  const dispatch = useDispatch();

  const reviewsVariable = useSelector((state) => Object.values(state.reviewsInRootReducer));


  useEffect(() => {
      dispatch(getAllReviewsByreviewId(id));
  }, [dispatch, JSON.stringify(reviewsVariable)])

    return (
      <div className='reviews-root-div' key={id}>
        <h1 className='title23'>Reviews for this spot</h1>
        <div className='all-reviews-div'>
        {reviewsVariable.map((reviewState, i) => {

          return (
            <div className='reviews-container' key={i}>
              <div className='full-user-review'>
              <p className='fullNameReview'>{`${reviewState.firstName} ${reviewState.lastName}`}</p>
              <p className='userReview'>{`${reviewState.stars} stars`}</p>
              <p className='actual-review'>{`${reviewState.review}`}</p>
            </div>
            </div>
          )
        })
        }
        </div>

      </div>
    )


};

export default ReviewsBySpotId;
