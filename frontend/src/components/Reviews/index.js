import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllReviewsByCurrentUser, removeReview } from '../../store/review';


const Reviews = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviewsInRootReducer));

  useEffect(() => {
      dispatch(getAllReviewsByCurrentUser())
    }, [dispatch ])



  const deleteReview = (reviewId) => async (e) => {
    e.preventDefault()
    await dispatch(removeReview(reviewId))
    await (dispatch(getAllReviewsByCurrentUser()))
    history.push('/user-reviews')
  }


  return (

    <div className='all-reviews-div'>
      <h1>Reviews</h1>
      {reviews.map((reviewState) => {
        {console.log(reviewState)}
        return (
          <div key={reviewState.id}>
          <div className='review-div'>
          <p className='stars'>{`${reviewState.firstName} ${reviewState.lastName}`}</p>
          <p className='user'>{`${reviewState.stars} stars`}</p>
          <p className='actual-review'>{`${reviewState.review}`}</p>
          </div>
          <div className="deleteButton">
            <button onClick={deleteReview(reviewState.id)}>Delete Review</button>
          </div>
          </div>
        )
      })
      }
    </div>
  )

};

export default Reviews;
