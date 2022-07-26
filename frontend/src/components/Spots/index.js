import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom'
import './spots.css'


const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spot));


    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <div className="all-spots-div">
        {spots?.map((spot, i) => {
          return (
            <Link to={`/spots/${spot?.id}`} className="spot-link" key={spot?.id}>
              <div className={`spot-div spot-div${i}`}>
                <div className="img-div">
                  <img className="spot-img" src={`${spot?.previewImage[0]?.url}`} alt="preview of spot"></img>
                </div>
                <div className="spot-info">
                  <p className="spot-city-state">{`${spot?.city}, ${spot?.state}`}</p>
                  <p className="spot-price">{`$${spot?.price} / night`}</p>
                </div>
              </div>
            </Link>
          )
        })
        }
      </div>
    )


};

export default Spots;