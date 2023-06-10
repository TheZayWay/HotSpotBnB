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
  const spotDataId = spotData.id

  useEffect(() => {
    dispatch(thunkLoadReviewsForSpot(spotId));
  }, [dispatch, spotId]);

  let revObj = useSelector((state) => state)
  const reviews = revObj.review;
  const reviewsArr = Object.values(reviews);
  const sessionUserId = revObj.session.user.id; //=2 so its correct and when log out/in its 1 
  const user = revObj.session.user
  const ownerId = revObj.spot[spotDataId].ownerId
  let userLoggedIn = null;
  // statement says if the session user i not the owner of the spot
  
  if (sessionUserId !== ownerId && Object.keys(reviews).length === 0) {
    userLoggedIn = (
      <div className="review-modal-button">
        <OpenModalButton
          className="review-button"
          buttonText="Post a review"
          modalComponent={
            <CreateReviewForSpots
              spotId={spotDataId}
              sessionUser={user}
            />
          }
        />
      </div>
    )
  }

  if (spotData.avgStar === null) {
    spotData.avgStar = "New"
  }
  
  // const handleDeleteReview = async (review) => {
  //   try {
  //     // Perform the delete operation
  //     // You can dispatch an action or make an API call here to delete the review
  //     // Example: await dispatch(deleteReview(review.id));
  //     console.log("Deleting review:", review);
  //   } catch (error) {
  //     console.error("Error deleting review:", error);
  //     // Handle the error here, such as displaying an error message or taking appropriate action
  //   }
  // };
  // handleDeleteReview()

  return (
    <>
      <div className="whole-reviews-container">
        <div className="description-for-reviews">
          <i className="fa fa-star fa-s"></i>
          <h3 className="avg-star-rating">
            {(spotData?.avgStar)}</h3>
          <div>&#x2022;</div>
          <h3 className="number-review-header">{`${spotData?.numReviews} ${
            spotData?.numReviews > 1 ? "reviews" : "review"
          }`}</h3>
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
                          })}
                          {" "}
                          {new Date(review.createdAt).getFullYear()}
                        </div>
                      </div>
                          {console.log("sessionUser",user)}
                      <div className="edit-review-div-container">
                        {revObj.session.user !== null &&
                        sessionUserId === review.userId ? (
                          <OpenModalButton
                            className="delete-review"
                            buttonText="Delete"
                            modalComponent={
                              <DeleteReview
                                review={review}
                                sessionUser={user}    
                              />     
                            }
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
            <div>No reviews available</div> // Conditional rendering when no reviews are available
          )}
        </div>
      </div>
    </>
  );
      
  
};

export default ReviewsForSpot;