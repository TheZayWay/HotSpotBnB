import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReviewForSpot } from "../../store/reviewReducer";
import { loadSpotIdThunk } from "../../store/spotReducer";
import './CreateReviewForSpot.css';

const CreateReviewForSpot = ({ spotId, sessionUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const userObj = { User: { ...sessionUser } };

  const reviews = useSelector((state) => state.review);
  const reviewsArr = Object.values(reviews);

  useEffect(() => {
    if (reviewsArr && reviewsArr.length > 0) {
      const newErrors = [];
      reviewsArr.forEach((review) => {
        if (review.User.id === sessionUser.id) {
          newErrors.push(
            <li key={review.id} className="cannot-submit-text">
              Cannot submit another review
            </li>
          );
          setIsButtonDisabled(true);
        }
      });
      setErrors(newErrors);
    }
  }, [reviewsArr, sessionUser.id]);

  const handleRatingHover = (value) => {
    if (!isButtonDisabled) {
      setStars(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const reviewDetails = {
      review,
      stars,
    };

    try {
      await dispatch(
        thunkCreateReviewForSpot(reviewDetails, spotId, userObj)
      );
      setIsLoaded(true);
      closeModal();
      history.push(`/spots/${spotId}`);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors);
        const formattedErrorMessages = errorMessages.map(
          (error) => error.split(": ")[1]
        );
        setErrors(formattedErrorMessages);
      }
    }
  };

  useEffect(() => {
    dispatch(loadSpotIdThunk(spotId));
    setIsLoaded(false);
  }, [dispatch, spotId, isLoaded]);

  return (
    <div className="create-review-container">
      <h3 className="textarea-title">How was your stay?</h3>
      <form className="review-form-container" onSubmit={handleSubmit}>
        <ul className="errors-map">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="review-input-container">
          <label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              disabled={isButtonDisabled}
              className="review-text-area"
              placeholder="Leave your review here"
            />
          </label>
          <label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`star ${value <= stars ? "filled" : ""}`}
                  onMouseEnter={() => handleRatingHover(value)}
                  onMouseLeave={() => handleRatingHover(stars)}
                  onClick={() => setStars(value)}
                >
                  ★
                </span>
              ))}
              <span className="stars-word">Stars</span>
            </div>
          </label>
          <button disabled={isButtonDisabled} type="submit" className="create-review-submit-btn">
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateReviewForSpot;