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

  // const createReview = (e) => {
  //   e.preventDefault();
  //   //dispatch(createReviewBasedOnSpotsId(id))
  //   history.push(`/create-review/${id}`);
  // };

  let serviceFee = 100;
  const calculationFunc = (pricePerNight) => {
    return pricePerNight * 6;
  };

  const AlertFunc = (e) => {
    alert("This feature is coming soon!");
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
          <div className="ImageGridTop">
            <div className="image1_20389">
              <img
                className="previewImage12"
                src={spot.images[3]?.url}
                alt="spot"
              ></img>
            </div>
            <div className="image2_20389">
              <img
                className="previewImage12"
                src={spot.images[1]?.url}
                alt="spot"
              ></img>
            </div>
          </div>
          <div className="imageGridBottom">
            <div className="image3_20389">
              <img
                className="previewImage12"
                id="top_20934"
                src={spot.images[2]?.url}
                alt="spot"
              ></img>
            </div>
            <div className="image4_20389">
              <img
                className="previewImage12"
                id="bottom_92738"
                src={spot.images[0]?.url}
                alt="spot"
              ></img>
            </div>
          </div>
        </div>
        <div className="bottom-container_1290">
          <div className="spotDetails">
            <div className="Owner-stuff-top-row">
              <h2 className="owner-title">{`Entire home hosted by ${spot?.Owner?.firstName}`}</h2>
            </div>
            <div className="top-info">
              <div className="stars">{`${Math.round(spot?.avgStarRating * 10) / 10} avg stars`}</div>
              <span className="space-span">·</span>
              <div className="bed">{`${spot.beds} beds`}</div>
              <span className="space-span">·</span>
              <div className="num-reviews">{`${spot.numReviews} reviews`}</div>
              <span className="space-span">·</span>
              <div className="address4">{` ${spot?.city}, ${spot?.state}, ${spot?.country}`}</div>
            </div>
            <span className="greyline"></span>
            {/* <h2 className="spotDetails-title">Spot Details</h2> */}
            <div className="QuickDetailsContainer">
              <div className="QuickDetails_234897">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "currentcolor",
                  }}
                  width="32"
                  height="32"
                >
                  <path
                    d="m16 17c3.8659932 0 7 3.1340068 7 7s-3.1340068 7-7 7-7-3.1340068-7-7 3.1340068-7 7-7zm0 2c-2.7614237 0-5 2.2385763-5 5s2.2385763 5 5 5 5-2.2385763 5-5-2.2385763-5-5-5zm9.6666667-18.66666667c1.0543618 0 1.9181651.81587779 1.9945142 1.85073766l.0054858.14926234v6.38196601c0 .70343383-.3690449 1.35080636-.9642646 1.71094856l-.1413082.0779058-9.6666667 4.8333334c-.5067495.2533747-1.0942474.2787122-1.6171466.0760124l-.1717078-.0760124-9.66666666-4.8333334c-.62917034-.3145851-1.04315599-.93418273-1.09908674-1.62762387l-.00648607-.16123049v-6.38196601c0-1.05436179.81587779-1.91816512 1.85073766-1.99451426l.14926234-.00548574zm0 2h-19.33333337v6.38196601l9.66666667 4.83333336 9.6666667-4.83333336z"
                    fill="#222222"
                  ></path>
                </svg>
                <div className="Text_92348">
                  <div className="Text_92348_top">{`${spot?.Owner?.firstName} is a Superhost`}</div>
                  <div className="Text_92348_bottom">
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                  </div>
                </div>
              </div>
              <div className="QuickDetails_234897">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "currentcolor",
                  }}
                  width="32"
                  height="32"
                >
                  <path
                    d="M16 0c6.627 0 12 5.373 12 12 0 6.337-3.814 12.751-11.346 19.257L16 31.82l-1.076-.932C7.671 24.509 4 18.218 4 12 4 5.423 9.397 0 16 0zm0 2C10.504 2 6 6.525 6 12c0 5.44 3.249 11.118 9.831 17.02l.169.149.576-.518c6.178-5.65 9.293-11.092 9.42-16.318L26 12c0-5.523-4.477-10-10-10zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                    fill="#222222"
                  ></path>
                </svg>
                <div className="Text_92348">
                  <div className="Text_92348_top">Great location</div>
                  <div className="Text_92348_bottom">
                    90% of recent guests gave the location a 5-star rating.
                  </div>
                </div>
              </div>
              <div className="QuickDetails_234897">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    fill: "currentcolor",
                  }}
                  width="32"
                  height="32"
                >
                  <path
                    d="m11.6667 0-.00095 1.666h8.667l.00055-1.666h2l-.00055 1.666 6.00065.00063c1.0543745 0 1.9181663.81587127 1.9945143 1.85073677l.0054857.14926323v15.91907c0 .4715696-.1664445.9258658-.4669028 1.2844692l-.1188904.1298308-8.7476886 8.7476953c-.3334303.3332526-.7723097.5367561-1.2381975.5778649l-.1758207.0077398h-12.91915c-2.68874373 0-4.88181754-2.1223321-4.99538046-4.7831124l-.00461954-.2168876v-21.66668c0-1.05436021.81587582-1.91815587 1.85073739-1.99450431l.14926261-.00548569 5.999-.00063.00095-1.666zm16.66605 11.666h-24.666v13.6673c0 1.5976581 1.24893332 2.9036593 2.82372864 2.9949072l.17627136.0050928 10.999-.0003.00095-5.6664c0-2.6887355 2.122362-4.8818171 4.7832071-4.9953804l.2168929-.0046196 5.66595-.0006zm-.081 8-5.58495.0006c-1.5977285 0-2.9037573 1.2489454-2.9950071 2.8237299l-.0050929.1762701-.00095 5.5864zm-18.586-16-5.999.00062v5.99938h24.666l.00065-5.99938-6.00065-.00062.00055 1.66733h-2l-.00055-1.66733h-8.667l.00095 1.66733h-2z"
                    fill="#222222"
                  ></path>
                </svg>
                <div className="Text_92348">
                  <div className="Text_92348_top">
                    Free cancellation for 48 hours.
                  </div>
                </div>
              </div>
            </div>
            <span className="greyline"></span>
            <div className="AirCoverContainer">
              <img className="AirCoverimg" src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"/>
              <div className="AirCoverDesc">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
            </div>
            <span className="greyline"></span>
            <h2 className="description-title">Description</h2>
            <div className="description_0978">{spot?.description}</div>
            <span className="greyline"></span>
          </div>
          {/* ----- CODE FOR RARE FIND CARD ----- */}
          <div className="Spot-Info-Card">
            <div className="both-buttons">
              {(currentUser && currentUser.id === spot.ownerId && (
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
              )) || (
                <div className="RareFindDiv">
                  <div className="RareFindMsg">
                    <div>
                      {
                        <span style={{ fontWeight: "bold" }}>
                          This is a rare find.
                        </span>
                      }{" "}
                      {`${spot.Owner.firstName}'s place on Airbnb is usually fully booked.`}
                    </div>
                  </div>
                  <div className="diamondSVG">
                    <svg
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: "40px",
                        width: "40px",
                        fill: "rgb(227, 28, 95)",
                        stroke: "currentcolor",
                      }}
                      width="70"
                      height="70"
                    >
                      <g stroke="none" fill="#E31C5F">
                        <path
                          d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                          fill-opacity="0.2"
                          fill="#E31C5F"
                        ></path>
                        <path
                          d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"
                          fill="#E31C5F"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            {/* ----- CODE FOR BOOKING CARD ----- */}
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
                    <div className="info-card-avgStar">{Math.round(spot?.avgStarRating * 10) / 10}</div>
                  <span className="space-span-infoCard">·</span>
                  <div className="info-card-reviews">{`${spot.numReviews} reviews`}</div>
                  </div>
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
                  <div className="per-night-res">{`$${calculationFunc(
                    spot.price
                  )}`}</div>
                  <div className="service-res">$100</div>
                  <div className="b4-taxes-res">{`$${
                    calculationFunc(spot.price) + serviceFee
                  }`}</div>
                </div>
              </div>
            </div>
          </div>
          {/* <span className="greyline"></span> */}
        </div>
        <div className="reviewSection_982347">
          <ReviewsBySpotId spot={spot} id={id} />
          {/* <div className="review-button-div">
                      <button className="reviewButton" onClick={createReview}>
                        Create a Review!
                      </button>
                    </div> */}
        </div>
      </div>
    )
  );
};

export default SpotDetails;
