import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { loadSpotIdThunk } from '../../../store/spotReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function SpotDetails () {
    const params = useParams();
    const spotId = params.spotId;
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spot);
    const spotData = Object.values(spot)[0];
   
    useEffect(() => {
        dispatch(loadSpotIdThunk(spotId))
    }, [dispatch])
    return (
        <>
            <div className="spot-information-container">
                {spotData && (
                    <>
                        <h3>{spotData.name}</h3> 
                        <h5>{spotData.city}, {spotData.state}, {spotData.country}</h5>
                        <img src={spotData.SpotImages[0].url} alt="Image" className="image-class" /> 
                    </>
                )}
            </div>
        </>
    )
    
}