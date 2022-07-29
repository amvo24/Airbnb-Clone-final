import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsOwnedByCurrentUser } from '../../store/spots';
import { Link } from 'react-router-dom'

const SpotsOwnedByUser = () => {
    const dispatch = useDispatch();
    //const reviews = useSelector((state) => Object.values(state.reviewsInRootReducer));
    const spots = useSelector((state) => Object.values(state.spotInRootReducer));



    useEffect(() => {
        dispatch(getSpotsOwnedByCurrentUser());
    }, [dispatch])

    const deleteReview = (e) => {
      e.preventDefualt()
      dispatch(deleteReview())
    }

    return (
      <div className='all-reviews-div'>
        <h1>Your Listings</h1>
        {spots.map((spotState, i) => {
          return (
            <div key={spotState.id}>
            <div className='previewImgDiv'>
                <img className='previewImg' src={spotState.previewImage}></img>
            </div>
            <div>
                <p className='address'>{`${spotState.city}, ${spotState.state}`}</p>
                <p className='listingName'>{`${spotState.name}`}</p>
                <p className='listingPrice'>{`${spotState.price}`}</p>
            </div>
            </div>
          )
        })
        }
      </div>
    )


};

export default SpotsOwnedByUser;
