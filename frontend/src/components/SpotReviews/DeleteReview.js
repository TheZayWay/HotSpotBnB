import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviewReducer";
import { loadSpotIdThunk} from "../../store/spotReducer";
import "./DeleteReview.css"

const DeleteReview = ({review}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const handleClick = async () => {
        dispatch(thunkDeleteReview(review.id))
        setIsLoaded(true)
    }

    useEffect(() => {
        dispatch(loadSpotIdThunk(spotId))
        setIsLoaded(false);
    },[dispatch, spotId, isLoaded])

    return (
        <div className="delete-review-modal-container">
        <div className="delete-pop-up">
            <div className="delete-header-close-button">
                {/* <span className="close-edit-button" onClick={() => closeModal()}><i className="fas fa-times"></i></span> */}
                <div className="review-delete-header">Confirm Delete</div>
            </div>
            <p className="delete-text-p-tag">Are you sure you want to delete this review?</p>
            <form className="delete-form-container" onSubmit={handleClick}>
                <button className="review-delete-button" type="submit">Yes (Delete Review)</button>
                <button className="review-cancel-button" onClick={() => closeModal()}>No (Keep Review)</button>
            </form>
        </div>
    </div>
    )
}

export default DeleteReview;