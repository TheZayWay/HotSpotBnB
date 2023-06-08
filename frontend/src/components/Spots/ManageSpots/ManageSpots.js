import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, Link } from "react-router-dom";
import { loadAllSpotsUserThunk } from "../../../store/spotReducer";
import CreateSpotForm from "../CreateSpotForm/CreateSpot";

export default function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const userSpots = useSelector((state) => state.spot);
    const userSpotsArr = Object.values(userSpots);
    const star = String.fromCharCode(0x2605);
    useEffect(() => {
      dispatch(loadAllSpotsUserThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);
  
    return (
      <div>
        <div>
            <h1>Manage Your Spots</h1>
            <button>Create a new spot</button>
        </div>
        <div>
        {userSpotsArr.map((spot) => {
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
                  {star}{spot.avgRating || "new"}
                </div> 
                <div className="price-line">${spot.price} night</div>
              </div>
            </div>
          );
        })}
        </div>
        <div>
            <button>Update Spot</button>
        </div>
      </div>
    );
  }