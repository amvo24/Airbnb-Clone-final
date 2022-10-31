import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviewsByreviewId } from "../../store/review";
//import CreateReview from './createReview'
import { Link, useParams, useHistory } from "react-router-dom";
import "./reviewsBySpotId.css";

const ReviewsBySpotId = ({ spot, id }) => {
  const moment = require('moment')
  const history = useHistory();
  const dispatch = useDispatch();
  const reviewsVariable = useSelector((state) =>
    Object.values(state.reviewsInRootReducer)
  );

  useEffect(() => {
    dispatch(getAllReviewsByreviewId(id));
  }, [dispatch, JSON.stringify(reviewsVariable)]);

  const createReview = (e) => {
    e.preventDefault();
    //dispatch(createReviewBasedOnSpotsId(id))
    history.push(`/create-review/${id}`);
  };


  return (
    <div className="reviews-root-div" key={id}>
      {/* <h1 className='title23'>Reviews for this spot</h1> */}
      <div className="ReviewTitle">
        <svg
          className="ReviewTitleSVG"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: "18px",
            width: "18px",
            fill: "currentcolor",
          }}
          width="32"
          height="32"
        >
          <path
            d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
            fill-rule="evenodd"
            fill="#222222"
          ></path>
        </svg>
        <div className="ReviewTitleRightOfSVG">
          <div className="ReviewTitleAVG">{Math.round(spot?.avgStarRating * 10) / 10}</div>
          <span className="ReviewTitleSpace-span">·</span>
          <div className="ReviewTitleNumReviews">{`${spot.numReviews} reviews`}</div>
        </div>
        <button className="reviewButton" onClick={createReview}>
          Create a Review!
        </button>
      </div>
      <div className="all-reviews-div">
        {reviewsVariable.map((reviewState, i) => {
          return (
            // <div className="reviews-container" key={i}>
            <div className="full-user-review">
              <div className="UserReviewTopLine">
                <div className="fullNameReview">{`${reviewState.firstName} ${reviewState.lastName}`}</div>
                <div className="ReviewStarNum">
                  <svg
                    className="ReviewTitleSVG12"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      height: "10px",
                      width: "10px",
                      fill: "currentcolor",
                    }}
                    width="32"
                    height="32"
                  >
                    <path
                      d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                      fill-rule="evenodd"
                      fill="#222222"
                    ></path>
                  </svg>
                  <div className="userReview">{`${reviewState.stars}`}</div>
                </div>
              </div>
              <div className="ReviewCreatedAt">{moment(reviewState.createdAt).format('MMMM YYYY')}</div>
              <div className="actual-review">{`${reviewState.review}`}</div>
            </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsBySpotId;
