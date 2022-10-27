import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ReviewsBySpotId from "./reviewsBySpotId";
import { getDetailsOfASpotFromAnId, deleteSpotById } from "../../store/spots";
import { createReviewBasedOnSpotsId } from "../../store/review";
import CreateReview from "./createReview";
import "./spotDetail.css";

const SpotDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams();
  id = Number(id);
  const spot = useSelector((state) => state.spotInRootReducer[id]);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getDetailsOfASpotFromAnId(id));
  }, [dispatch, id, JSON.stringify(spot)]);

  const removeSpot = (e) => {
    e.preventDefault();
    dispatch(deleteSpotById(id));
    history.push("/");
  };

  const editSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/edit/${id}`);
  };

  const createReview = (e) => {
    e.preventDefault();
    //dispatch(createReviewBasedOnSpotsId(id))
    history.push(`/create-review/${id}`);
  };

  let serviceFee = 100
  const calculationFunc = (pricePerNight) => {
    return pricePerNight * 6
  }

  const AlertFunc = (e) => {
    alert("This feature is coming soon!")
  }

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
          <div className="ImageGridTop">
            <img
              className="previewImage12"
              src={spot.previewImage}
              alt="spot"
            ></img>
            <img
              className="previewImage12"
              src={spot.previewImage}
              alt="spot"
            ></img>
          </div>
          <div className="imageGridBottom">
            <img
              className="previewImage12"
              id="this"
              src={spot.previewImage}
              alt="spot"
            ></img>
            <img
              className="previewImage12"
              id="this"
              src={spot.previewImage}
              alt="spot"
            ></img>
          </div>
        </div>
        <div className="bottom-container">
          <div className="spotDetails">
            <div className="Owner-stuff-top-row">
              <h2 className="owner-title">{`Entire home hosted by ${spot?.Owner?.firstName}`}</h2>
            </div>
            <div className="top-info">
              <div className="stars">{`${spot?.avgStarRating} avg stars`}</div>
              <span className="space-span">·</span>
              <div className="bed">{`${spot.beds} beds`}</div>
              <span className="space-span">·</span>
              <div className="num-reviews">{`${spot.numReviews} reviews`}</div>
              <span className="space-span">·</span>
              <div className="address4">{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
            </div>
            <span className="greyline"></span>
            {/* <h2 className="spotDetails-title">Spot Details</h2> */}
            <h2 className="description-title">Description</h2>
            <div className="description">{spot?.description}</div>
            <div className="reviews">
              <div className="review-component">
                <div className="mini-review-top-bar">
                  <div className="review-button-div">
                    <button className="reviewButton" onClick={createReview}>
                      Create a Review!
                    </button>
                  </div>
                  <ReviewsBySpotId id={id} />
                </div>
              </div>
            </div>
          </div>
          <div className="Spot-Info-Card">
            <div className="both-buttons">
              {currentUser && currentUser.id === spot.ownerId && (
                <div className="owner-options">
                  <h2 className="owner-options-title">Owner Options</h2>
                  <div>
                    <button className="removeSpotButton" onClick={removeSpot}>
                      Delete Spot
                    </button>
                    <span className="space-span"></span>
                    <button className="editSpotButton" onClick={editSpot}>
                      Edit Spot
                    </button>
                  </div>
                </div>
              ) ||
              <div className="RareFindDiv">
                <div className="RareFindMsg">
                  <div>
                  {<span style={{fontWeight: 'bold'}}>This is a rare find.</span>} {`${spot.Owner.firstName}'s place on Airbnb is usually fully booked.`}

                  </div>
                </div>
                <div className="diamondSVG">
                  <svg xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{display: 'block', height: '40px', width: '40px', fill: 'rgb(227, 28, 95)', stroke: 'currentcolor'}}
                  width="70"
                  height="70"><g
                  stroke="none"
                  fill="#E31C5F">
                    <path
                      d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                      fill-opacity="0.2"
                      fill="#E31C5F">
                    </path>
                    <path
                      d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"
                      fill="#E31C5F">
                    </path>
                    </g>
                    </svg>
                </div>
              </div>
              }
            </div>
            <div onClick={AlertFunc} className="info-card_234">
              <div className="topOfInfoCard_234">
                <div className="info-card-first-line">
                  <div className="info-card-price">{`$${spot.price} night`}</div>
                  <div className="avgStarDiv">
                    <svg
                      className="AVGStarSVG"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{display: 'block', height: '10px', width: '10px', fill: 'currentcolor'}}
                      width="32"
                      height="32">
                        <path
                        d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                        fill-rule="evenodd"
                        fill="#222222">
                          </path></svg>
                    <div className="info-card-avgStar">{`${spot.avgStarRating}`}</div>
                  </div>
                  <span className="space-span-infoCard">·</span>
                  <div className="info-card-reviews">{`${spot.numReviews} reviews`}</div>
                </div>
                <div className="Check-in-dates">
                  <div className="InnOutTop">
                    <div className="CheckIn">CHECK-IN</div>
                    <div className="Checkout">CHECKOUT</div>
                  </div>
                  <div className="GuestsDropdown">GUESTS</div>
                </div>
                <button className="Reserve-Button">Reserve</button>
                <div className="Wont-be-charged"> You won't be charged yet</div>
              </div>
              <div className="Bottom-of-infoCard">
                <div className="left-side-calculation">
                  <div className="amount-per-night">{`$${spot.price} x 6 nights`}</div>
                  <div className="Service-fee">Service fee</div>
                  <div className="B4-Taxes">Total before taxes</div>
                </div>
                <div className="GreyLine_123"></div>
                <div className="right-side-calc">
                  <div className="per-night-res">{`$${calculationFunc(spot.price)}`}</div>
                  <div className="service-res">$100</div>
                  <div className="b4-taxes-res">{`$${calculationFunc(spot.price) + serviceFee}`}</div>
                </div>
              </div>
            </div>
          </div>
          {/* <span className="greyline"></span> */}
        </div>
      </div>
    )
  );
};

export default SpotDetails;
