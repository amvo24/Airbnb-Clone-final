import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import ReviewsBySpotId from './reviewsBySpotId'
import { getDetailsOfASpotFromAnId, deleteSpotById, editSpotById } from "../../store/spots";

const SpotDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  let { id } = useParams()
  id = Number(id)
  const spot = useSelector(state => (state.spotInRootReducer));
  

  const currentUser = useSelector(state => (state.session.user));
  useEffect(() => {
  dispatch(getDetailsOfASpotFromAnId(id));
  }, [dispatch]);

  const removeSpot = (e) => {
    e.preventDefault()
    dispatch(deleteSpotById(id))
    history.push('/')
  }
  const editSpot = (e) => {
    e.preventDefault()
    dispatch(editSpotById(id))
    history.push(`/spots/edit/${id}`)
  }



  return (
    <div>
      <h1>{spot?.name}</h1>
      <div>
        <span>{spot?.avgStarRating}</span>
        <span>{` ${spot?.numReviews} reviews`}</span>
        <span>{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</span>
      </div>
      <div>
              <img className="previewImage" src={spot.previewImage} alt="spot"></img>
      </div>
      <div>
        {spot?.description}
      </div>
      <div>
        {currentUser &&
          currentUser.user &&
          currentUser.user.id === spot.ownerId && (
        <div>
              <button onClick={removeSpot}>Delete Spot</button>
              <button onClick={editSpot}>Edit Spot</button>
        </div>
        )}
        <div>
          <ReviewsBySpotId id={id}/>
        </div>
      </div>
  </div>


  )
}

export default SpotDetails;
