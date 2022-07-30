import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllReviewsByCurrentUser, removeReview } from '../../store/review';


const Reviews = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviewsInRootReducer));

  // let reviewsAmt = useRef(reviews.length)


  const deleteReview = (e, reviewId) => {
    e.preventDefault()
    dispatch(removeReview(reviewId)).then(dispatch(getAllReviewsByCurrentUser()))
    history.push('/user-reviews')
  }

  useEffect(() => {
      dispatch(getAllReviewsByCurrentUser())
    }, [dispatch ])

  return (

    <div className='all-reviews-div'>
      <h1>Reviews</h1>
      {reviews.map((reviewState) => {
        return (
          <div key={reviewState.id}>
          <div className='review-div'>
          <p className='stars'>{`${reviewState.User.firstName} ${reviewState.User.lastName}`}</p>
          <p className='user'>{`${reviewState.stars} stars`}</p>
          <p className='actual-review'>{`${reviewState.review}`}</p>
          </div>
          <div className="deleteButton">
            <button onClick={e => deleteReview(e, reviewState.id)}>Delete Review</button>
          </div>
          </div>
        )
      })
      }
    </div>
  )

};

export default Reviews;
