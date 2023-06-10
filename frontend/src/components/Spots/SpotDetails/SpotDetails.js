import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadSpotIdThunk } from '../../../store/spotReducer';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsForSpot from '../../SpotReviews/ReviewForSpot';
import './SpotDetails.css';

export default function SpotDetails() {
    const dispatch = useDispatch();
    const params = useParams();
    const spotId = Number(params.spotId);
    // console.log("spotId", spotId)
    const spot = useSelector((state) => state.spot);
    const spotData = spot[spotId];
    // console.log("spotData:", spotData)
    const image = spotData?.SpotImages?.[0]?.url;
    const user = spotData?.User; //user who made the listing
    const star = String.fromCharCode(0x2605);
    let review = "";
    // console.log("re", spotData.numReviews)
    if (spotData?.numReviews === 0) {
      review = ""
      spotData.numReviews = ""
    }
    if (spotData?.numReviews === 1) {
      review = "review"
    }

    if (spotData?.numReviews > 1) {
      review = "reviews"
    }

    if (spotData?.avgStar === null) {
      spotData.avgStar = "New"
    } 

    useEffect(() => {
      dispatch(loadSpotIdThunk(spotId));
    }, [dispatch, spotId]);
  
    if (spotId === spotData?.id) {
      return (
        <> 
          <div className="spot-information-container">
            {spotData && (
              <>
                <h3 className="spot-name">{spotData?.name}</h3>
                <h5 className="spot-details">{spotData?.city}, {spotData?.state}, {spotData?.country}</h5>
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
            <p className="spot-description">{spotData?.description}</p>
            <div className="reserve-container">
               <div className="reserve-top-line">
                <div className="price">${spotData?.price} <span className="night">night</span></div>
                <div className="review-stuff">{star} {spotData?.avgStar} {spotData?.numReviews} {review} </div>
               </div> 
               <div className="reserve-bottom-line">
                <button className="reserve-button" onClick={() => (alert("Feature coming soon..."))}>Reserve</button>
               </div>
            </div>
          </div>         
          <hr></hr>
          {/* <p className="below-line">
            {star} {spotData?.avgStar} {spotData?.numReviews} {review}
          </p> */}
          <div className="review-section">
            <div className="review-bookings-div">
                <div className="left-side-review-bookings">
                    <ReviewsForSpot spotData={spotData}/>
                </div>
            </div>
            {/* <button>Post Your Review</button> */}
          </div>
        </>
      );
    }
  
    return null;
  }