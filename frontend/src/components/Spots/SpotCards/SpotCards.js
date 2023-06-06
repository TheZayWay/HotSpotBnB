import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpotsThunk } from "../../../store/spotReducer";
import { Link } from 'react-router-dom';
import './SpotCards.css'

export default function SpotCards() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArr = Object.values(spots);
  
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
              <Link className="cards" to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt="Spot Preview" />
              </Link>
              <div className="under-image">
                <div className="under-image-top-line">
                  <div className="spot-location">
                  {spot.city}, {spot.state} 
                  </div>
                  {spot.avgRating || "new"}
                </div> 
                <div className="price-line">${spot.price} night</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }