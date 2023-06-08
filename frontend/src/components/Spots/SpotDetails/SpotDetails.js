import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadSpotIdThunk } from '../../../store/spotReducer';
import { useDispatch, useSelector } from 'react-redux';
import './SpotDetails.css';

export default function SpotDetails() {
    const dispatch = useDispatch();
    const params = useParams();
    const spotId = Number(params.spotId);
    const spot = useSelector((state) => state.spot);
    const spotData = spot[spotId];
    const image = spotData?.SpotImages?.[0]?.url;
    const user = spotData?.User;
    const star = String.fromCharCode(0x2605);
    
    if (spotData?.avgStar === null) {
      spotData.avgStar = "new"
    } 

    useEffect(() => {
      dispatch(loadSpotIdThunk(spotId));
    }, [dispatch, spotId]);
  
    if (spotId === spotData?.id) {
      return (
        <> 
         {/* <div className="whole-container">
          
         </div>          */}
          <div className="spot-information-container">
            {spotData && (
              <>
                <h3 className="spot-name">{spotData.name}</h3>
                <h5 className="spot-details">{spotData.city}, {spotData.state}, {spotData.country}</h5>
              </>
            )}
          </div>
          <div className="image-container">
            {image && <img src={image} alt="Spot Image" className="spot-image" />}
          </div>
          <div className="name-line">
            Hosted by {user?.firstName} {user?.lastName}
          </div>
          <div className="bottom-row">
            <p>{spotData.description}</p>
            <div className="reserve-container">
               <div className="reserve-top-line">
                <div className="price">${spotData.price}night</div>
                <div className="review-stuff">{star} {spotData.avgStar} {spotData.numReviews} reviews</div>
               </div> 
               <div className="reserve-bottom-line">
                <button className="reserve-button" onClick={() => (alert("Feature coming soon..."))}>Reserve</button>
               </div>
            </div>
          </div>         
          <hr></hr>
          <p className="below-line">
            {star} {spotData.avgStar} {spotData.numReviews}
          </p>
          <div className="review-section">
            <div>FirstName</div>
            <div>Date of Review</div>
            <div>Comment Text</div>
          </div>
        </>
      );
    }
  
    return null;
  }