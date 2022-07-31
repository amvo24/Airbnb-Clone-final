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
  }, [dispatch])

    return (
      <div className='all-reviews-div' key={id}>
        <h1 className='title'>Reviews</h1>
        {reviewsVariable.map((reviewState, i) => {
          // {console.log("THIS IS YOUR REVIEW STATE IN JSX", reviewState)}
          return (
            <div key={reviewState.id}>
            <p className='stars'>{`${reviewState.User.firstName} ${reviewState.User.lastName}`}</p>
            <p className='user'>{`${reviewState.stars} stars`}</p>
            <p className='actual-review'>{`${reviewState.review}`}</p>
            </div>
          )
        })
        }
        {/* <div>
        <CreateReview id={id}/>
        </div> */}
      </div>
    )


};

export default ReviewsBySpotId;
