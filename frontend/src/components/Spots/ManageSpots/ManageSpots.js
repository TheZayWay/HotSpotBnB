import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, Link, useParams } from "react-router-dom";
import { loadAllSpotsUserThunk } from "../../../store/spotReducer";
import OpenModalButton from "../../OpenModalButton";
import CreateSpotForm from "../CreateSpotForm/CreateSpot";
import UpdateSpot from "../UpdateSpotForm/UpdateSpot";
import DeleteSpot from "../DeleteSpot/DeleteSpot"
import "./ManageSpot.css"


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

    //loop to get filtered spots
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
          {/* <button className="create-new-spot-btn">Create a new spot</button> */}
          {/* only want to show create a new spot if there are no spots */}
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
                    {star} {!isNaN(spot.avgRating) && spot.avgRating !== 0.00 ? spot.avgRating.toFixed(2) : "New"}
                  </div>
                </div> 
                <div className="price-line">
                  <span className="manage-price">${spot.price}</span> night
                </div>
                <div className="crud-buttons">
                  {/* {console.log(spot.id)} */}
                <Link to={`/spots/${spot.id}/edit`}>
                <button className="update-create-spot-button">Update Spot</button>
                </Link>
                <OpenModalButton
                    className="manage-delete-btn"
                    buttonText="Delete"
                    modalComponent={<DeleteSpot spotId={spot.id}/>}
                />
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
  
  // // <button className="update-create-spot-button"
  // spotid={<UpdateSpot spotById={spot.id} />}
  // >Update Spot</button>