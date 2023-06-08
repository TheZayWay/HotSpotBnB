// import { loadAllSpotsUserThunk } from "../../../store/spotReducer";
// import { Link, useParams } from 'react-router-dom';
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function UserSpots () {
//     const { userId } = useParams();
//     const dispatch = useDispatch();
//     const spots =  useSelector((state) => state.spot)
//     const spotsArr = Object.values(spots);

//     useEffect(() => {
//         dispatch(loadAllSpotsUserThunk(userId))
//       }, [dispatch, userId])
    
//     return (
//         <div>
//             <div className="top-portion-manage-spots">
//                 <h1>Manage Your Spots</h1>
//                 <div>
//                     {/* {spotsArr.map((spot) => <SpotCards spot={spot} userId={userId}/>)} */}
//                 </div>
//                 <Link to="/spotss/new">
//                     <button className="create-spot-button">Create a New Spot</button>
//                 </Link>
//             </div>
//             <div className="crud-buttons">
//                 {/* <Link to={`/spots/${spotId}/edit`}>
//                     <button className="update-button">Update</button>
//                 </Link> */}
//                 <Link>
//                     <button className="delete-button">Delete</button>
//                 </Link>
                
//             </div>
//         </div>
        
//     )
// }