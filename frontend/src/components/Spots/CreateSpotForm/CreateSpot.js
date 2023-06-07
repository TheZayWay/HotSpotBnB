import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCreateSpotThunk } from "../../../store/spotReducer";
import './CreateSpot.css'


export default function CreateSpotForm () {
    return (
       <div className="entire-form">
        <form className="create-spot-form">
        <h2>Create a Spot</h2>  
        Street Address  
        <label>
          <input
            type="text"
            required
            className="input-field"
          />
        </label>
        City
        <label>
          <input
            type="text"
            required
            className="input-field"
          />
        </label>
        State
        <label>
          <input
            type="text"
            required
            className="input-field"
          />
        </label>
        Country
        <label>
          <input
            type="text"
            required
            className="input-field"
          />
        </label>
        Name
        <label>
          <input
            type="text"
            required
            className="input-field"
          />
        </label>
        Description
        <label>
          <textarea
            type="textarea"
            required
            className="input-field"
          />
        </label>
        Price
        <label>
            $<input 
              type="text"
              required
              className="input-field"
            />
        </label>
        Image Url of Spot
        <label>
            <input 
              type="text"
              required
              className="input-field"
            />
        </label>
        <button type="submit">Create Spot</button>
      </form>
       </div> 
        
    )
}