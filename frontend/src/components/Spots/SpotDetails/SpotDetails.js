import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadSpotIdThunk } from '../../../store/spotReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function SpotDetails() {
    const dispatch = useDispatch();
    const params = useParams();
    const spotId = Number(params.spotId);
    const spot = useSelector((state) => state.spot);
    const spotData = spot[spotId];
    const image = spotData?.SpotImages?.[0]?.url;
  
    useEffect(() => {
      dispatch(loadSpotIdThunk(spotId));
    }, [dispatch, spotId]);
  
    if (spotId === spotData?.id) {
      return (
        <>
          <div className="spot-information-container">
            {spotData && (
              <>
                <h3>{spotData.name}</h3>
                <h5>{spotData.city}, {spotData.state}, {spotData.country}</h5>
              </>
            )}
          </div>
          <div className="image-container">
            {image && <img src={image} alt="Spot Image" className="spot-image" />}
          </div>
        </>
      );
    }
  
    return null;
  }