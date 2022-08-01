import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotsOwnedByCurrentUser } from '../../store/spots';
import { Link } from 'react-router-dom'
import './spotsByOwner.css'

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
      <div className='all-Airbnbs-div'>
        <h1 className='listing-title'>Your AirBnbs</h1>
        {spots.map((spotState, i) => {
          return (
            <div key={spotState.id} className="listing-container">
            <div className='listingAirbnb'>
            <div className='previewImgDiv'>
                <img className='previewImg' src={spotState.previewImage}></img>
            </div>
            <div className='airbnb-details'>
                <p className='address'>{`${spotState.city}, ${spotState.state}`}</p>
                <p className='listingName'>{`${spotState.name}`}</p>
                <p className='listingPrice'>{`Priced at $${spotState.price} a night`}</p>
            </div>
            </div>
            {/* <div className='line'></div> */}
            </div>
          )
        })
        }
      </div>
    )


};

export default SpotsOwnedByUser;
