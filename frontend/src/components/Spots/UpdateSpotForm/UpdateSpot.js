import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { loadEditSpotThunk, loadSpotIdThunk } from "../../../store/spotReducer";
import './UpdateSpot.css';

export default function UpdateSpotForm() {
  const { spotId } = useParams();
  // let spotid;
  const spotObj = useSelector((state) => state.spot[spotId])
  // console.log("spotObj", spotObj)
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState(spotObj?.address ?? "");
  const [city, setCity] = useState(spotObj?.city ?? "");
  const [state, setState] = useState(spotObj?.state ?? "");
  const [country, setCountry] = useState(spotObj?.country ?? "");
  const [name, setName] = useState(spotObj?.name ?? "");
  const [description, setDescription] = useState(spotObj?.description ?? "");
  const [price, setPrice] = useState(spotObj?.price ?? "");
  const [url, setUrl] = useState(spotObj?.SpotImages?.[0]?.url ?? "");
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
      if (spotId) {
        dispatch(loadSpotIdThunk(spotId));
      }
    }, [dispatch, spotId]);

    // useEffect(() => {
    //       if (spotId) {
    //         dispatch(loadSpotIdThunk(spotId));
    //         setSubmitted(false);
    //       }
    //     }, [dispatch, spotId, submitted]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = [];

    const characterRegex = /^[a-zA-Z\s]*$/; // Regex to allow only characters and spaces

    if (!country || !characterRegex.test(country)) {
      validationErrors.push("Country is required");
    }

    if (!address || !characterRegex.test(address)) {
      validationErrors.push("Address is required");
    }

    if (!city || !characterRegex.test(city)) {
      validationErrors.push("City is required");
    }

    if (!state || !characterRegex.test(state)) {
      validationErrors.push("State is required");
    }
    // || !characterRegex.test(description
    if (description.length < 30 ) {
      validationErrors.push("Description needs a minimum of 30 characters");
    }

    if (!name || !characterRegex.test(name)) {
      validationErrors.push("Name is required");
    }

    if (!price) {
      validationErrors.push("Price is required");
    }

    if (address.length > 25) {
      validationErrors.push("Address cannot be over 25 characters")
    }

    if (city.length > 25) {
      validationErrors.push("City cannot be over 25 characters")
    }

    if (state.length > 25) {
      validationErrors.push("State cannot be over 25 characters")
    }

    if (country.length > 25) {
      validationErrors.push("Country cannot be over 25 characters")
    }

    if (name.length > 25) {
      validationErrors.push("Name cannot be over 25 characters")
    }
    
    

    // if (!url || !characterRegex.test(url)) {
    //   validationErrors.push("Preview image is required");
    // } else if (!/\.(png|jpe?g)$/i.test(url)) {
    //   validationErrors.push("Image URL must end in .png, .jpg, or .jpeg");
    // }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newSpotDetails = {
      address,
      city,
      state,
      country,
      lat: 100,
      lng: -100,
      name,
      description,
      price,
      url,
    };

    const newSpot =  await dispatch(loadEditSpotThunk(spotId, newSpotDetails)).then(() => history.push(`/spots/${spotId}`))
    
  //   try {
  //     const newSpot =  await dispatch(loadEditSpotThunk(spotId, spotDetails)).then(() => history.push(`/spots/${spotId}`))
  //     // spotId = spot.id;
  //     // setSubmitted(true);
  //     // history.push(`/spots/${newSpot.id}`);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error state or display error message to the user
  //   }
  };

  // useEffect(() => {
  //   if (spotId) {
  //     dispatch(loadSpotIdThunk(spotId));
  //     setSubmitted(false);
  //   }
  // }, [dispatch, spotId, submitted]);

  const hasErrors = errors.length > 0;
  const allInputsEmpty = !address && !city && !state && !country && !name && !description && !price && !url;


  return (
    <div className={`entire-update-spot-form ${hasErrors ? "has-errors" : ""}`}>
      <form className="update-spot-form" onSubmit={handleSubmit}>
        <h2 className="update-spot-title">Update your Spot</h2>
        <div className="error-container">
          {errors.map((error, idx) => (
            <p key={idx} className="validation-error">{error}</p>
          ))}
        </div>
        <p class="update-spot-p-tag">Where's your place located?</p>
        <div class="update-spot-div">Guests will only get your exact address once they booked a reservation.</div>
        {/* <span className="form-input-headers">Street Address </span>  */}
        <label>
          <input
            type="text"
            required
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street Address"
          />
        </label>
        {/* <span className="form-input-headers">City</span>  */}
        <label>
          <input
            type="text"
            required
            className="input-field"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </label>
        {/* <span className="form-input-headers">State</span>  */}
        <label>
          <input
            type="text"
            required
            className="input-field"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
        </label>
        {/* <span className="form-input-headers">Country</span>  */}
        <label>
          <input
            type="text"
            required
            className="input-field"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
        </label>
        <p class="update-spot-p-tag">Describe your place to guests</p>
        <div class="update-spot-div">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
        {/* <span className="form-input-headers">Description</span>  */}
        <label>
          <textarea
            type="textarea"
            required
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
        </label>
        <p class="update-spot-p-tag">Create a title for your spot</p>
        <div class="update-spot-div">Catch guests' attention with a spot title that highlights what makes your place special.</div>
        {/* <span className="form-input-headers">Name</span>  */}
        <label>
          <input
            type="text"
            required
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
        </label>
        <p class="update-spot-p-tag">Set a base price for your spot</p>
        <div class="update-spot-div">Competitive pricing can help your listing stand out and rank higher in search results.</div>
        {/* <span className="form-input-headers">Price</span>  */}
        <label>
            <input 
              type="number"
              min={1}
              required
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            />
        </label>
        <p class="update-spot-p-tag">Liven up your spot with a photo</p>
        <div class="update-spot-div">Submit a link to one photo to publish your spot</div>
        {/* <span className="form-input-headers">Image URL</span>  */}
        <label>
            <input 
               type='url'
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               required
               placeholder="Preview Image URL"
               className="input-field"
            />
        </label>
        <button className="update-submit-button" type="submit" disabled={allInputsEmpty}>Update Spot</button>
      </form>
       </div>  
    )
}













