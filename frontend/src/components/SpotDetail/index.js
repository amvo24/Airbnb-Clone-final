import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import ReviewsBySpotId from './reviewsBySpotId'
import { getDetailsOfASpotFromAnId, deleteSpotById, editSpotById } from "../../store/spots";
import { createReviewBasedOnSpotsId } from "../../store/review"
import CreateReview from "./createReview";
import './spotDetail.css'

const SpotDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  let { id } = useParams()
  id = Number(id)


  const spot = useSelector(state => state.spotInRootReducer[id]);
  console.log('THIS IS SPOT DATA IN YOUR COMPONENT ', spot)
  //const spot = useSelector(state => state.spotInRootReducer);
  const currentUser = useSelector(state => (state.session.user));
  // console.log("THIS IS YOUR CURRENT USER", currentUser)

  // useEffect(() => {
  //   if (!spot) {
  //     dispatch(getDetailsOfASpotFromAnId(id));
  //     }
  //   }, [dispatch, id]);

  useEffect(() => {
      dispatch(getDetailsOfASpotFromAnId(id));
    }, [dispatch, id]);



  const removeSpot = (e) => {
    e.preventDefault()
    dispatch(deleteSpotById(id))
    history.push('/')
  }
  // const editSpot = (e) => {
  //   e.preventDefault()
  //   //dispatch(editSpotById(id))
  //   history.push(`/spots/edit/${id}`)
  // }
  const editSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/edit/${id}`);
  };

  const createReview = (e) => {
    e.preventDefault()
    //dispatch(createReviewBasedOnSpotsId(id))
    history.push(`/create-review/${id}`)
  }



  return (
    spot && (
      <>
    <div>
      <h1 className="detailName">{spot.name}</h1>
      <div>
              <img className="previewImage" src={spot.previewImage} alt="spot"></img>
      </div>
      <div className="spotDetails">
        <span>{spot?.avgStarRating}</span>
        <span>{`${spot.beds} beds`}</span>
        <span>{` ${spot.numReviews} reviews`}</span>
        <span>{` ${spot?.city}, ${spot?.state}, ${spot?.country}   `}</span>
        {/* <span>{spot.description}</span> */}
      </div>
      <div>
        {spot?.description}
      </div>
      <div>
        {currentUser &&
          // currentUser &&
          currentUser.id === spot.ownerId && (
              <div>
              <button onClick={removeSpot}>Delete Spot</button>
              <button onClick={editSpot}>Edit Spot</button>

              </div>
        )}
        <div>
          <ReviewsBySpotId id={id}/>
        </div>
        <div>
        <button onClick={createReview}>Create a Review!</button>
        </div>
        {/* <div>
          <CreateReview id={id}/>
        </div> */}
      </div>
  </div>
  </>
    )
  )
}

export default SpotDetails;
