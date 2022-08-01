import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllReviewsByCurrentUser, removeReview } from '../../store/review';
import './review.css'


const Reviews = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviewsInRootReducer));

  useEffect(() => {
      dispatch(getAllReviewsByCurrentUser())
    }, [dispatch, JSON.stringify(reviews)])



  const deleteReview = (reviewId) => async (e) => {
    e.preventDefault()
    await dispatch(removeReview(reviewId))
    await (dispatch(getAllReviewsByCurrentUser()))
    history.push('/user-reviews')
  }


  return (

    <div className='user-reviews-div100'>
      <h1>Reviews</h1>
      {reviews.map((reviewState) => {

        return (
          <div className='reviewContainer100' key={reviewState.id}>
            <div className='subreview100'>
          <div className='review-div100'>
          <p className='user100'>{`${reviewState.firstName} ${reviewState.lastName}`}</p>
          <p className='stars100'>{`${reviewState.stars} stars`}</p>
          <p className='actual-review100'>{`"${reviewState.review}"`}</p>
          <div className="deleteButton100">
            <button className='efhiowaws4352' onClick={deleteReview(reviewState.id)}>Delete Review</button>
          </div>
          </div>

            </div>
          </div>
        )
      })
      }
    </div>
  )

};

export default Reviews;
