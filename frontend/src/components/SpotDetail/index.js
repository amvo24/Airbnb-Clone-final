import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { getDetailsOfASpotFromAnId, deleteSpotById, editSpotById } from "../../store/spots";

const SpotDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    let { id } = useParams()
    id = Number(id)
    //const spot = useSelector(state => (state.spotInRootReducer[id]));
    const spot = useSelector(state => (state.spotInRootReducer));


    useEffect(() => {
    dispatch(getDetailsOfASpotFromAnId(id));
    }, [dispatch]);

    const removeSpot = (e) => {
      e.preventDefault()
      dispatch(deleteSpotById(id))
      history.push('/')
    }

  return (
    <>
      <h1>{spot?.name}</h1>
      <div>
        <span>{spot?.avgStarRating}</span>
        <span>{` ${spot?.numReviews} reviews`}</span>
        <span>{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</span>
      </div>
      <div>
        {spot?.images?.map(image => {
          return (
            <div key={image.url}>
              <img src={`${image?.url}`} alt="spot"></img>
            </div>
          )
        })}
      </div>
      <div>{spot?.description}</div>
    <button onClick={removeSpot}>Delete Spot</button>
    </>
  )
}

export default SpotDetails;
