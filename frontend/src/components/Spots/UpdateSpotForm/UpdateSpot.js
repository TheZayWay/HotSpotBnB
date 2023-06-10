import { loadEditSpotThunk, loadSpotIdThunk } from "../../../store/spotReducer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom"
export default function UpdateSpot () {
  const { spotId } = useParams();
  // console.log("id", spotId)
  
  let spotid;
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spot)
  // console.log("spotid", spotId)
  const spotInfo = spot[spotId];
  console.log("spotIn", spotInfo)

  const history = useHistory();
  const [address, setAddress] = useState(spotInfo?.address);
  const [city, setCity] = useState(spotInfo?.city);
  const [state, setState] = useState(spotInfo?.state);
  const [country, setCountry] = useState(spotInfo?.country);
  const [name, setName] = useState(spotInfo?.name);
  const [description, setDescription] = useState(spotInfo?.description);
  const [price, setPrice] = useState(spotInfo?.price);
  const [url, setUrl] = useState(spotInfo?.SpotImages?.[0]?.url)
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  console.log("url", url)
  
  useEffect(() => {
    if (spotId) {
      dispatch(loadSpotIdThunk(spotId));
      setSubmitted(false);
    }
  }, [dispatch, spotId, submitted]);

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

    return await dispatch(loadEditSpotThunk(spotDetails, spotId))
            .then(() => history.push(`/spots/${spotId}`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    const errorMessages = Object.values(data.errors);
                    const formattedErrorMessages = errorMessages.map(error => error.split(": ")[1]);
                    setErrors(formattedErrorMessages);
                }
            });

  //   try {
  //     const spot = 
  //     // spotid = spot.id;  
  //     setSubmitted(true);
  //     history.push(`/spots/${spotId}`);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error state or display error message to the user
  //   }
  // };
  // return await dispatch(loadEditSpotThunk(spotDetails, spotId))
  // .then(() => history.push(`/spots/${spot.id}`))
  //       .catch(
  //         async (res) => {
  //           const data = await res.json();
  //           if(data && data.errors) setErrors(data.errors)
  //         }
  //       )
    }
  
  
    return (
       <div className="entire-create-spot-form">
        <form className="create-spot-form" onSubmit={handleSubmit}>
        <h2>Update a Spot</h2>
        Street Address  
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
        City
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
        State
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
        Country
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
        Name
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
        Description
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
        Price
        <label>
            <input 
              type="number"
              required
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price in USD"
            />
        </label>
        Image Url of Spot
        <label>
            <input 
               type='url'
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               required
               placeholder="Preview Image URL"
            />
        </label>
        <button type="submit">Update Spot</button>
      </form>
       </div> 
        
    )
}

