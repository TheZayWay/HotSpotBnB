import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpotsThunk } from "../../../store/spotReducer";
import { Link } from 'react-router-dom';
import './SpotCards.css'

export default function SpotCards() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArr = Object.values(spots);
    const star = String.fromCharCode(0x2605);
    
    useEffect(() => {
      dispatch(loadAllSpotsThunk());
    }, [dispatch]);
    
    return (
      <div className="card-container">
        {spotsArr.map((spot) => {
          if (!spot || !spot.id || !spot.previewImage) {
            return null;
          }
          
          return (
            <div className="card" key={spot.id}>
              <Link to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt="Spot Preview" className="card-image"/>
              </Link>
              <div className="under-image">
                <div className="under-image-top-line">
                  <div className="spot-location">
                  {spot.city}, {spot.state} 
                  </div>
                  <div className="card-stars">
                    {star}<span className="star-rating">{spot.avgRating || "new"}</span>
                  </div>
                </div> 
                <div className="price-line"><span className="price-num">${spot.price.toFixed(2)}</span> night</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }