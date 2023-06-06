import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllSpotsThunk } from "../../../store/spotReducer";
import { Link } from 'react-router-dom';
import './SpotCards.css'

export default function SpotCards () {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spot);
    const spotsArr = Object.values(spots);
    console.log("spotsimageurl:", spotsArr)
    useEffect(() => {
        dispatch(loadAllSpotsThunk())
    }, [dispatch])
    
    return (
        <div className="card-container">
            {spotsArr.map((spot) => 
            <div className="card">
            <Link className='cards' to={`/spots/${spot.id}`}>{spot.previewImage}</Link>
            {/* going to put link into img */}
            <img></img>
            <div className="under-image">
                {spot.city},{spot.state} {spot.avgRating} #.# 
                <div className="price-line">${spot.price} night</div>
            </div>
            </div>)}
        </div>
        
    )
}