import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCreateSpotThunk } from "../../../store/spotReducer";
import './CreateSpot.css'


export default function CreateSpotForm () {
    return (
       <div>
        <h1>Create a Spot</h1>
        <p>Where's your place located?</p>
        <p>Guests will only get your exact address once they booked a reservation.</p>
        <form>
        <label>
          Country
          <input
            type="text"
            required
          />
        </label>
        <label>
          Street Address
          <input
            type="text"
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            required
          />
        </label>,
        <label>
          State
          <input
            type="text"
            required
          />
        </label>
        <hr></hr>
        <div>Describe your place to guests</div>
        <p>Mention the best features of your space, any special amentities like
fast wifi or parking, and what you love about the neighborhood.</p>
        <label>
          <textarea
            type="textarea"
            required
          />
        </label>
        <hr></hr>
        <div>Create a title for your spot</div>
        <p>Catch guests' attention with a spot title that highlights what makes
your place special.</p>
        <label>
          <input
            type="text"
            required
          />
        </label>
        <hr></hr>
        <div>Set a base price for your spot</div>
        <p>Competitive pricing can help your listing stand out and rank higher
in search results.</p>
        <label>
            $<input 
              type="text"
              required
            />
        </label>
        <div>Liven up your spot with photos</div>
        <div>Submit a link to at least one photo to publish your spot</div>
        <label>
            <input 
              type="text"
              required
            />
        </label>
        <button type="submit">Create Spot</button>
      </form>
       </div> 
        
    )
}