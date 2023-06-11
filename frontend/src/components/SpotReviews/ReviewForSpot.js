import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkLoadReviewsForSpot } from "../../store/reviewReducer";
import { useModal } from "../../context/Modal";
import CreateReviewForSpots from "./CreateReviewForSpot";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "./DeleteReview";
import "./ReviewForSpot.css";

const ReviewsForSpot = ({ spotData }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotDataId = spotData.id;
  console.log("spotData", spotData);

  useEffect(() => {
    dispatch(thunkLoadReviewsForSpot(spotId));
  }, [dispatch, spotId]);

  const revObj = useSelector((state) => state);
  const reviews = revObj.review;
  const reviewsArr = Object.values(reviews);
  const sessionUserId = revObj.session.user?.id; // Use optional chaining to access user id
  const user = revObj.session.user;
  const ownerId = revObj.spot[spotDataId].ownerId;
  let userLoggedIn = null;

  // Check if the user is logged in and not the owner of the spot
  if (sessionUserId && sessionUserId !== ownerId && Object.keys(reviews).length === 0) {
    userLoggedIn = (
      <div className="review-modal-button">
        <OpenModalButton
          className="review-button"
          buttonText="Post a review"
          modalComponent={
            <CreateReviewForSpots spotId={spotDataId} sessionUser={user} />
          }
        />
      </div>
    );
  }

  if (spotData.avgStar === null) {
    spotData.avgStar = "New";
  }

  if (Object.values(reviews).length === 0) {

  } 
  
 
  return (
    <>
      <div className="whole-reviews-container">
        <div className="description-for-reviews">
          <i className="fa fa-star fa-s"></i>
          <h3 className="avg-star-rating">{!isNaN(spotData.avgStar) ? spotData.avgStar.toFixed(2) : "New"}</h3>
          <div>{spotData.numReviews > 0 ? <div>&#x2022;</div> : ""}</div>
          {/* <div>&#x2022;</div> */}
          {/* <h3 className="number-review-header">{`${spotData?.numReviews} ${
            spotData?.numReviews > 1 ? "reviews" : "review"
          }`}</h3> */}
          <h3 className="number-review-header">
            {spotData.numReviews < 1
            ? "" // If spotData.numReviews is less than 1, render an empty string
            : `${spotData.numReviews} ${
            spotData.numReviews > 1 ? "reviews" : "review"
            }`}
          </h3>
          {userLoggedIn}
        </div>
        <div className="lower-section-container">
          {reviewsArr.length > 0 ? (
            reviewsArr.map((review) => (
              <div key={review?.id} className="review-and-pic">
                <div className="review-with-delete">
                  <div className="pic-name-date-div">
                    <i className="fas fa-user fa-2x" />
                    <div className="name-date-buttons-container">
                      <div className="name-and-date-div">
                        <div className="review-user-firstname">{review?.User?.firstName}</div>
                        <div className="review-date">
                          {new Date(review?.createdAt).toLocaleString("en-US", {
                            month: "long",
                          })}{" "}
                          {new Date(review.createdAt).getFullYear()}
                        </div>
                      </div>
                      <div className="edit-review-div-container">
                        {sessionUserId && sessionUserId === review.userId ? (
                          <OpenModalButton
                            className="delete-review"
                            buttonText="Delete"
                            modalComponent={<DeleteReview review={review} sessionUser={user} />}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="review-by-user">{review?.review}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reviews">
            {userLoggedIn
              ? "Be the first to post a review!"
              : "No reviews available"}
          </div>
          )}
        </div>
      </div>
    </>
  );
};


export default ReviewsForSpot



// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { thunkLoadReviewsForSpot } from "../../store/reviewReducer";
// import { useModal } from "../../context/Modal";
// import CreateReviewForSpots from "./CreateReviewForSpot";
// import OpenModalButton from "../OpenModalButton";
// import DeleteReview from "./DeleteReview";
// import "./ReviewForSpot.css";

// const ReviewsForSpot = ({ spotData }) => {
//   const dispatch = useDispatch();
//   const { spotId } = useParams();
//   const spotDataId = spotData.id;
//   console.log("spotData", spotData);

//   useEffect(() => {
//     dispatch(thunkLoadReviewsForSpot(spotId));
//   }, [dispatch, spotId]);

//   const revObj = useSelector((state) => state);
//   const reviews = revObj.review;
//   const reviewsArr = Object.values(reviews);
//   const sessionUserId = revObj.session.user?.id; // Use optional chaining to access user id
//   const user = revObj.session.user;
//   const ownerId = revObj.spot[spotDataId].ownerId;
//   let userLoggedIn = null;

//   // Check if the user is logged in, not the owner of the spot, and has not reviewed the spot
//   const userHasReviewed = reviewsArr.some(review => review.User.id === sessionUserId);
//   if (sessionUserId && sessionUserId !== ownerId && !userHasReviewed) {
//     userLoggedIn = (
//       <div className="review-modal-button">
//         <OpenModalButton
//           className="review-button"
//           buttonText="Post a review"
//           modalComponent={
//             <CreateReviewForSpots spotId={spotDataId} sessionUser={user} />
//           }
//         />
//       </div>
//     );
//   }

//   if (spotData.avgStar === null) {
//     spotData.avgStar = "New";
//   }

//   return (
//     <>
//       <div className="whole-reviews-container">
//         <div className="description-for-reviews">
//           <i className="fa fa-star fa-s"></i>
//           <h3 className="avg-star-rating">{!isNaN(spotData.avgStar) ? spotData.avgStar.toFixed(2) : "New"}</h3>
//           <div>&#x2022;</div>
//           <h3 className="number-review-header">{`${spotData?.numReviews} ${
//             spotData?.numReviews > 1 ? "reviews" : "review"
//           }`}</h3>
//           {userLoggedIn}
//         </div>
//         <div className="lower-section-container">
          
//           {reviewsArr.length > 0 ? (
//             reviewsArr.map((review) => ( 
//               <div key={review?.id} className="review-and-pic">
//                 <div className="review-with-delete">
//                   <div className="pic-name-date-div">
//                     <i className="fas fa-user fa-2x" />
//                     <div className="name-date-buttons-container">
//                       <div className="name-and-date-div">
//                         <div className="review-user-firstname">{review?.User?.firstName}</div>
//                         <div className="review-date">
//                           {new Date(review?.createdAt).toLocaleString("en-US", {
//                             month: "long",
//                           })}{" "}
//                           {new Date(review.createdAt).getFullYear()}
//                         </div>
//                       </div>
//                       <div className="edit-review-div-container">
//                         {sessionUserId && sessionUserId === review.userId ? (
//                           <OpenModalButton
//                             className="delete-review"
//                             buttonText="Delete Review"
//                             modalComponent={<DeleteReview reviewId={review.id} />}
//                           />
//                         ) : null}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="review-body-container">
//                     <div className="stars-user-rating">
//                       <i className="fa fa-star" />
//                       <h3>{review?.stars}</h3>
//                     </div>
//                     <div className="review-body-text">{review?.review}</div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="no-review-message">
//               No reviews yet. Be the first one to write a review!
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReviewsForSpot;
