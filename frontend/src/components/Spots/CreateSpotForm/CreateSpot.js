import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadCreateSpotThunk, loadSpotIdThunk } from "../../../store/spotReducer";
import './CreateSpot.css';

export default function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  let spotId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = [];

    const characterRegex = /^[a-zA-Z\s]*$/; // Regex to allow only characters and spaces

    if (!country || !characterRegex.test(country)) {
      validationErrors.push("Country is required");
    }

    if (!address) {
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
      url,
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

  const hasErrors = errors.length > 0;
  const allInputsEmpty = !address && !city && !state && !country && !name && !description && !price && !url;

  return (
    <div className={`entire-create-spot-form ${hasErrors ? "has-errors" : ""}`}>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <h2 className="create-spot-title">Create a Spot</h2>
        <ul className="error-container">
          {errors.map((error, idx) => (
            <li key={idx} className="validation-error">{error}</li>
          ))}
        </ul>
        <p class="create-spot-p-tag">Where's your place located?</p>
        <div class="create-spot-div">Guests will only get your exact address once they booked a reservation.</div>
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
        <p class="create-spot-p-tag">Describe your place to guests</p>
        <div class="create-spot-div">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
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
        <p class="create-spot-p-tag">Create a title for your spot</p>
        <div class="create-spot-div">Catch guests' attention with a spot title that highlights what makes your place special.</div>
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
        <p class="create-spot-p-tag">Set a base price for your spot</p>
        <div class="create-spot-div">Competitive pricing can help your listing stand out and rank higher in search results.</div>
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
        <p class="create-spot-p-tag">Liven up your spot with a photo</p>
        <div class="create-spot-div">Submit a link to one photo to publish your spot</div>
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
        <button className="create-submit-button" type="submit" disabled={allInputsEmpty}>Create Spot</button>
      </form>
       </div>  
    )
}


// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { loadCreateSpotThunk, loadSpotIdThunk } from "../../../store/spotReducer";
// import './CreateSpot.css';

// export default function CreateSpotForm() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [url, setUrl] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [submitted, setSubmitted] = useState(false);

//   let spotId;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     const validationErrors = [];

//     const characterRegex = /^[a-zA-Z\s]*$/; // Regex to allow only characters and spaces

//     if (!country || !characterRegex.test(country)) {
//       validationErrors.push(<p>Country is required</p>);
//     }

//     if (!address || !characterRegex.test(address)) {
//       validationErrors.push(<p>Address is required</p>);
//     }

//     if (!city || !characterRegex.test(city)) {
//       validationErrors.push(<p>City is required</p>);
//     }

//     if (!state || !characterRegex.test(state)) {
//       validationErrors.push(<p>State is required</p>);
//     }

//     if (description.length < 30 || !characterRegex.test(description)) {
//       validationErrors.push(<p>Description needs a minimum of 30 characters</p>);
//     }

//     if (!name || !characterRegex.test(name)) {
//       validationErrors.push(<p>Name is required</p>);
//     }

//     if (!price) {
//       validationErrors.push(<p>Price is required</p>);
//     }

//     if (!url || !characterRegex.test(url)) {
//       validationErrors.push(<p>Preview image is required</p>);
//     } else if (!/\.(png|jpe?g)$/i.test(url)) {
//       validationErrors.push(<p>Image URL must end in .png, .jpg, or .jpeg</p>);
//     }

//     if (validationErrors.length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const spotDetails = {
//       address,
//       city,
//       state,
//       country,
//       lat: 100,
//       lng: -100,
//       name,
//       description,
//       price,
//       url,
//     };

//     try {
//       const spot = await dispatch(loadCreateSpotThunk(spotDetails));
//       spotId = spot.id;
//       history.push(`/spots/${spot.id}`);
//       setSubmitted(true);
//     } catch (error) {
//       console.error(error);
//       // Handle error state or display error message to the user
//     }
//   };

//   useEffect(() => {
//     if (spotId) {
//       dispatch(loadSpotIdThunk(spotId));
//       setSubmitted(false);
//     }
//   }, [dispatch, spotId, submitted]);

//   return (
//     <div className="entire-create-spot-form">
//       <form className="create-spot-form" onSubmit={handleSubmit}>
//         <h2 className="create-spot-title">Create a Spot</h2>
//         <div className="error-container">
//         <ul className="errors">
//           {errors.map((error, idx) => (
//             // <li className="error" key={idx}>{error}</li>
//             <span key={idx} className="validation-error">{error}</span>
//           ))}
//         </ul>
//         </div>
//         <p class="create-spot-p-tag">Where's your place located?</p>
//         <div class="create-spot-div">Guests will only get your exact address once they booked a reservation.</div>
//         {/* <span className="form-input-headers">Street Address </span>  */}
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Street Address"
//           />
//         </label>
//         {/* <span className="form-input-headers">City</span>  */}
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="City"
//           />
//         </label>
//         {/* <span className="form-input-headers">State</span>  */}
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             placeholder="State"
//           />
//         </label>
//         {/* <span className="form-input-headers">Country</span>  */}
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             placeholder="Country"
//           />
//         </label>
//         <p class="create-spot-p-tag">Describe your place to guests</p>
//         <div class="create-spot-div">Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
//         {/* <span className="form-input-headers">Description</span>  */}
//         <label>
//           <textarea
//             type="textarea"
//             required
//             className="input-field"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Please write at least 30 characters"
//           />
//         </label>
//         <p class="create-spot-p-tag">Create a title for your spot</p>
//         <div class="create-spot-div">Catch guests' attention with a spot title that highlights what makes your place special.</div>
//         {/* <span className="form-input-headers">Name</span>  */}
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name of your spot"
//           />
//         </label>
//         <p class="create-spot-p-tag">Set a base price for your spot</p>
//         <div class="create-spot-div">Competitive pricing can help your listing stand out and rank higher in search results.</div>
//         {/* <span className="form-input-headers">Price</span>  */}
//         <label>
//             <input 
//               type="number"
//               required
//               className="input-field"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Price per night (USD)"
//             />
//         </label>
//         <p class="create-spot-p-tag">Liven up your spot with a photo</p>
//         <div class="create-spot-div">Submit a link to one photo to publish your spot</div>
//         {/* <span className="form-input-headers">Image URL</span>  */}
//         <label>
//             <input 
//                type='url'
//                value={url}
//                onChange={(e) => setUrl(e.target.value)}
//                required
//                placeholder="Preview Image URL"
//                className="input-field"
//             />
//         </label>
//         <button className="create-submit-button" type="submit">Create Spot</button>
//       </form>
//        </div>  
//     )
// }




//How i want my form after getting approved
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom"
// import { loadCreateSpotThunk, loadSpotIdThunk } from "../../../store/spotReducer";
// import './CreateSpot.css'


// export default function CreateSpotForm () {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [url, setUrl] = useState("")
//   const [errors, setErrors] = useState([]);
//   const [submitted, setSubmitted] = useState(false);
  
//   let spotId;
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors([]);

//     if (errors.length > 0) return;

//     const spotDetails = {
//       address,
//       city,
//       state,
//       country,
//       lat: 100,
//       lng: -100,
//       name,
//       description,
//       price,
//       url
//     };

//     try {
//       const spot = await dispatch(loadCreateSpotThunk(spotDetails));
//       spotId = spot.id;
//       history.push(`/spots/${spot.id}`);
//       setSubmitted(true);
//     } catch (error) {
//       console.error(error);
//       // Handle error state or display error message to the user
//     }
//   };

//   useEffect(() => {
//     if (spotId) {
//       dispatch(loadSpotIdThunk(spotId));
//       setSubmitted(false);
//     }
//   }, [dispatch, spotId, submitted]);
  
//     return (
//        <div className="entire-create-spot-form">
//         <form className="create-spot-form" onSubmit={handleSubmit}>
//         <h2 className="create-spot-title">Create a Spot</h2>
//         <ul className='errors'>
//           {errors.map((error, idx) => (
//             <li key={idx}>{error}</li>
//           ))}
//         </ul>
//         <span className="form-input-headers">Street Address </span> 
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Street Address"
//           />
//         </label>
//         <span className="form-input-headers">City</span> 
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             placeholder="City"
//           />
//         </label>
//         <span className="form-input-headers">State</span> 
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             placeholder="State"
//           />
//         </label>
//         <span className="form-input-headers">Country</span> 
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             placeholder="Country"
//           />
//         </label>
//         <span className="form-input-headers">Name</span> 
//         <label>
//           <input
//             type="text"
//             required
//             className="input-field"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Name of your spot"
//           />
//         </label>
//         <span className="form-input-headers">Description</span> 
//         <label>
//           <textarea
//             type="textarea"
//             required
//             className="input-field"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Please write a description here"
//           />
//         </label>
//         <span className="form-input-headers">Price</span> 
//         <label>
//             <input 
//               type="text"
//               required
//               className="input-field"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="Price in USD"
//             />
//         </label>
//         <span className="form-input-headers">Image URL</span> 
//         <label>
//             <input 
//                type='url'
//                value={url}
//                onChange={(e) => setUrl(e.target.value)}
//                required
//                placeholder="Preview Image URL"
//                className="input-field"
//             />
//         </label>
//         <button className="create-submit-button" type="submit">Create Spot</button>
//       </form>
//        </div> 
        
//     )
// }

