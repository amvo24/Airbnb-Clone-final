import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReviewsBySpotId from "./reviewsBySpotId";
import {
  getDetailsOfASpotFromAnId,
  deleteSpotById,
  editSpotById,
} from "../../store/spots";
import { createReviewBasedOnSpotsId } from "../../store/review";
import CreateReview from "./createReview";
import "./spotDetail.css";

const SpotDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams();
  id = Number(id);

  const spot = useSelector((state) => state.spotInRootReducer[id]);
  
  //const spot = useSelector(state => state.spotInRootReducer);
  const currentUser = useSelector((state) => state.session.user);
  //

  // useEffect(() => {
  //   if (!spot) {
  //     dispatch(getDetailsOfASpotFromAnId(id));
  //     }
  //   }, [dispatch, id]);

  useEffect(() => {
    dispatch(getDetailsOfASpotFromAnId(id));
  }, [dispatch, id]);

  const removeSpot = (e) => {
    e.preventDefault();
    dispatch(deleteSpotById(id));
    history.push("/");
  };
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
    e.preventDefault();
    //dispatch(createReviewBasedOnSpotsId(id))
    history.push(`/create-review/${id}`);
  };

  return (
    spot && (
      <div className="main-div">
        <h1 className="detailName">{spot.name}</h1>
        <div className="image-div">
          <img
            className="previewImage"
            src={spot.previewImage}
            alt="spot"
          ></img>
        </div>
        <div className="bottom-container">
          <h2 className="spotDetails-title">Spot Details</h2>
          <div className="spotDetails">
            <div className="top-info">
              <div className="stars">{`${spot?.avgStarRating} avg stars`}</div>
              <span className="space-span">·</span>
              <div className="bed">{`${spot.beds} beds`}</div>
              <span className="space-span">·</span>
              <div className="num-reviews">{`${spot.numReviews} reviews`}</div>
              <span className="space-span">·</span>
              <div className="address">{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
            </div>
            <h2 className="description-title">Description</h2>
            <div className="description">{spot?.description}</div>
          </div>
          <div className="both-buttons">
            {currentUser &&
              // currentUser &&
              currentUser.id === spot.ownerId && (
                <div className="owner-options">
                <h2>Owner Options</h2>
                <div>
                  <button onClick={removeSpot}>Delete Spot</button>
                  <button onClick={editSpot}>Edit Spot</button>
                </div>
                </div>
              )}
          </div>
          <div className="reviews">
              <div className="review-component">
              <ReviewsBySpotId id={id} />
              </div>
              <div className="review button">
                <button onClick={createReview}>Create a Review!</button>
              </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SpotDetails;
