import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsByCurrentUser } from '../../store/review';
import { Link } from 'react-router-dom'

const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.reviewsInRootReducer));
    const spots = useSelector((state) => Object.values(state.spotInRootReducer));
    


    useEffect(() => {
        dispatch(getAllReviewsByCurrentUser());
    }, [dispatch])

    return (
      <div className='all-reviews-div'>
        <h1>Your Reviews</h1>
        {reviews.map((reviewState, i) => {
          return (
            <div>
            <p className='stars'>{`${reviewState.User.firstName} ${reviewState.User.lastName}`}</p>
            <p className='user'>{`${reviewState.stars} stars`}</p>
            <p className='actual-review'>{`${reviewState.review}`}</p>
            </div>
          )
        })
        }
      </div>
    )


};

export default Reviews;
