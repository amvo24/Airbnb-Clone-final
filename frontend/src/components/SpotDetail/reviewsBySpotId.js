import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsByreviewId } from '../../store/review';
import CreateReview from './createReview'
import { Link, useParams } from 'react-router-dom'

const ReviewsBySpotId = ({id}) => {
  const dispatch = useDispatch();
  // let { id } = useParams()
  // id = Number(id)

  //makes it an array of objects
  const reviewsVariable = useSelector((state) => Object.values(state.reviewsInRootReducer));


  // const spotIdGetter = () => {
    // for (let spot of reviews) {

    //   let spotId = spot.Spot.id
    // }
  // }


  //const reviews = useSelector(state => (state.reviews))
  //const spots = useSelector((state) => Object.values(state.spotInRootReducer));



  useEffect(() => {
      dispatch(getAllReviewsByreviewId(id));
  }, [dispatch])

    return (
      <div className='all-reviews-div'>
        <h1>Your Reviews</h1>
        {reviewsVariable.map((reviewState, i) => {
         
          return (
            <div>
            <p className='stars'>{`${reviewState.User.firstName} ${reviewState.User.lastName}`}</p>
            <p className='user'>{`${reviewState.stars} stars`}</p>
            <p className='actual-review'>{`${reviewState.review}`}</p>
            </div>
          )
        })
        }
        <div>
        <CreateReview id={id}/>
        </div>
      </div>
    )


};

export default ReviewsBySpotId;
