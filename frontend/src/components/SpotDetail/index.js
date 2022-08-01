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
        <div className="address1">{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
        <div className="image-div">
          <img
            className="previewImage"
            src={spot.previewImage}
            alt="spot"
          ></img>
        </div>
        <div className="bottom-container">
          <div className="spotDetails">
            <div className="Owner-stuff-top-row">
            <h2 className="owner-title">{`Entire home hosted by ${spot.Owner.firstName}`}</h2>

          <div className="both-buttons">
            {currentUser &&
              // currentUser &&
              currentUser.id === spot.ownerId && (
                <div className="owner-options">
                <h2 className="owner-options-title">Owner Options</h2>
                <div>
                  <button className="removeSpotButton" onClick={removeSpot}>Delete Spot</button>
                  <span className="space-span"></span>
                  <button className="editSpotButton" onClick={editSpot}>Edit Spot</button>
                </div>
                </div>
              )}
          </div>
            </div>
            <div className="top-info">
              <div className="stars">{`${spot?.avgStarRating} avg stars`}</div>
              <span className="space-span">·</span>
              <div className="bed">{`${spot.beds} beds`}</div>
              <span className="space-span">·</span>
              <div className="num-reviews">{`${spot.numReviews} reviews`}</div>
              <span className="space-span">·</span>
              <div className="address">{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
            </div>
          <span className="greyline"></span>
          {/* <h2 className="spotDetails-title">Spot Details</h2> */}
            <h2 className="description-title">Description</h2>
            <div className="description">{spot?.description}</div>
          </div>
          <span className="greyline"></span>
          <div className="reviews">
              <div className="review-button-div">
                <button className="reviewButton" onClick={createReview}>Create a Review!</button>
              </div>
              <div className="review-component">
              <ReviewsBySpotId id={id} />
              </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SpotDetails;
