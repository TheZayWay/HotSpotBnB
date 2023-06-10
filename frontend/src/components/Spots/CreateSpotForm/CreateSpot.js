import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { loadCreateSpotThunk, loadSpotIdThunk } from "../../../store/spotReducer";
import './CreateSpot.css'


export default function CreateSpotForm () {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("")
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  
  let spotId;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (errors.length > 0) return;

    const spotDetails = {
      address,
      city,
      state,
      country,
      lat: 100,
      lng: -100,
      name,
      description,
      price,
      url
    };

    try {
      const spot = await dispatch(loadCreateSpotThunk(spotDetails));
      spotId = spot.id;
      history.push(`/spots/${spot.id}`);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      // Handle error state or display error message to the user
    }
  };

  useEffect(() => {
    if (spotId) {
      dispatch(loadSpotIdThunk(spotId));
      setSubmitted(false);
    }
  }, [dispatch, spotId, submitted]);
  
    return (
       <div className="entire-create-spot-form">
        <form className="create-spot-form" onSubmit={handleSubmit}>
        <h2 className="create-spot-title">Create a Spot</h2>
        <ul className='errors'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <span className="form-input-headers">Street Address </span> 
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
        <span className="form-input-headers">City</span> 
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
        <span className="form-input-headers">State</span> 
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
        <span className="form-input-headers">Country</span> 
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
        <span className="form-input-headers">Name</span> 
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
        <span className="form-input-headers">Description</span> 
        <label>
          <textarea
            type="textarea"
            required
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write a description here"
          />
        </label>
        <span className="form-input-headers">Price</span> 
        <label>
            <input 
              type="text"
              required
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in USD"
            />
        </label>
        <span className="form-input-headers">Image URL</span> 
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
        <button className="create-submit-button" type="submit">Create Spot</button>
      </form>
       </div> 
        
    )
}

