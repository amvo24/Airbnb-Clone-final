import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { getDetailsOfASpotFromAnId } from "../../store/spots";

const SpotDetails = () => {
    const dispatch = useDispatch()
    let { id } = useParams()
    id = Number(id)
    const spot = useSelector(state => state.spot.id);
    console.log('LOOK HERE FOR SPOT', spot)

    useEffect(() => {
    dispatch(getDetailsOfASpotFromAnId(id));
    }, [dispatch, id]);

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
    </>
  )
}

export default SpotDetails;
