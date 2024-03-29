import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots, createNewSpot } from "../../store/spots";
import { Link, NavLink } from "react-router-dom";
import "./spots.css";

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spotInRootReducer));
  const reviews = useSelector((state) =>
    Object.values(state.reviewsInRootReducer)
  );


  //const user = useSelector((state) => Object.values(state.user))

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch, JSON.stringify(spots)]);

  return (
    <div className="middle_container">
      <div className="DisplayTotalPriceContainer">
        <div className="DisplayTotalPrice">
          <div className="DisplayTotalPriceLeftSide">
            <div className="DisplayTotalPriceText">Display total price</div>
            <div className="DisplayTotalPriceLine"></div>
            <div className="DisplayTotalPriceDescript">Includes all fees, before taxes</div>
          </div>
          <div className="DisplayTotalPricerightSide">
            <div className="DisplayTotalPriceButton">Button</div>
          </div>
        </div>
      </div>
      <div className="all-spots-grid">
        {spots.map((spot, index) => (
          <div className="spot-div-2345" key={index}>
            <Link to={`/spots/${spot.id}`} className="spot-link" key={spot.id}>
              <div className="spot-div">
                <div className="img-div">
                  <img className="spot-img"src={spot.previewImage} alt="preview of spot"></img>
                </div>
                <div className="spot-info">
                  <div className="spot-info-first-line">
                  {/* <div className="spot-info-name">{spot.name}</div> */}
                  <div className="Spot-info-AvgStar">{spot?.avgStarRating}</div>
                  </div>
                  <div className="spot-city-state">{`${spot.city}, ${spot.state}`}</div>
                  <div className="spot-beds">{`${spot.beds} beds`}</div>
                  <div className="spot-price">{`$${spot.price} night`}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div>FOOTER</div>
    </div>
  );


};

export default Spots;
