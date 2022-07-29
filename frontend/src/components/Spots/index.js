import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, createNewSpot } from '../../store/spots';
import { Link, NavLink } from 'react-router-dom'
import './spots.css'


const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spotInRootReducer));

    //const user = useSelector((state) => Object.values(state.user))



    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])



    return (
      <div className="all-spots-div">
      {spots.map((spot, index) => (
        <div key={index}>
          <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot.id}>
            <div className={`spot-div spot-div${index}`}>
              <div className="img-div">
                <img className="spot-img" src={spot.previewImage} alt="preview of spot"></img>
              </div>
              <div className="spot-info">
                <p className="spot-city-state">{`${spot?.city}, ${spot?.state}`}</p>
                <p className="spot-price">{`$${spot?.price} night`}</p>
              </div>
            </div>
          </Link>
          </div>
      ))}
    </div>
  )

  // return (
  //   <div className="spotsPage">
  //     {spots &&
  //       spots.map((spot) => (
  //         <NavLink to={`/spots/${spot.id}`} key={spot.id}>
  //             {/* <div key={spot.id}> */}
  //             <div className="eachSpot">
  //               <img
  //                 className="spotImg"
  //                 src={spot.previewImage}
  //                 alt={spot.name}
  //               ></img>
  //               <h3 className="spotName">{spot.name}</h3>
  //               <h4 className="spotLocation">
  //                 {spot.city}, {spot.state}
  //               </h4>
  //               <p className="spotAddress">{spot.address}</p>
  //               <p className="spotDetails">{spot.description}</p>
  //               <p className="spotPrice"> ${spot.price} night</p>
  //             </div>
  //         {/* </div> */}
  //           </NavLink>
  //       ))}
  //   </div>
  // );

};

export default Spots;
