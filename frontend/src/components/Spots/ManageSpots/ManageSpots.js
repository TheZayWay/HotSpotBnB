import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, Link, useParams } from "react-router-dom";
import { loadAllSpotsUserThunk } from "../../../store/spotReducer";
import CreateSpotForm from "../CreateSpotForm/CreateSpot";
import UpdateSpot from "../UpdateSpot/UpdateSpot";
import ManageSpot from "./ManageSpot.css"
//import update(edit) also delete

export default function ManageSpots() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const userState = useSelector((state) => state);
    const userSpots = userState.spot;
    const userId = userState.session.user.id;
    const userSpotsArr = Object.values(userSpots);
    const correctUserArr = [];
    
    //need to make this value dynamic
    for (let i = 0; i < userSpotsArr.length; i++) {
      if (userSpotsArr[i]['ownerId'] === userId)  
        correctUserArr.push(userSpotsArr[i])
      }

    const star = String.fromCharCode(0x2605);
    useEffect(() => {
      dispatch(loadAllSpotsUserThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);
  
    return (
      <div>
        <div>
          <h1 className="manage-spots-title">Your Spots</h1>
          <button className="create-new-spot-btn">Create a new spot</button>
        </div>
        
        <div className="image-container">
          {correctUserArr.map((spot) => {
            if (!spot || !spot.id || !spot.previewImage) {
            return null;
          }
          
          return (
              <div className="card" key={spot.id}>
              <Link className="cards" to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt="Spot Preview" className="card-image"/>
              </Link>
              <div className="under-image">
                <div className="under-image-top-line">
                  <div className="spot-location">
                  {spot.city}, {spot.state} 
                  </div>
                  <div className="rating-line">
                    {star} {spot.avgRating || "new"}
                  </div>
                </div> 
                <div className="price-line">
                  ${spot.price} night
                </div>
                <div className="crud-buttons">
                <Link to={`spot/${spotId}/edit`}>
                  <button className="update-create-spot-button">Update Spot</button>
                </Link>
                <button className="delete-create-spot-button">Delete Spot</button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        <div>
        </div>
      </div>    
    );
  }
