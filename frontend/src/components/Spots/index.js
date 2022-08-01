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
  // console.log('LOOK HERE', reviews)

  //const user = useSelector((state) => Object.values(state.user))

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="all-spots-div">
      {spots.map((spot, index) => (
        <div key={index}>
          <Link to={`/spots/${spot.id}`} className="spot-link" key={spot.id}>
            <div className={`spot-div`}>
              <div className="img-div">
                <img className="spot-img"src={spot.previewImage} alt="preview of spot"></img>
              </div>
              <div className="spot-info">
              {/* <span className="space-span">·</span> */}
                <p className="spot-city-state">{`${spot.city}, ${spot.state}`}</p>
                {/* <p className="avg-stars">{reviews}</p> */}
                <p className="spot-beds">{`${spot.beds} beds`}</p>
                <p className="spot-price">{`$${spot.price} night`}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );


};

export default Spots;
