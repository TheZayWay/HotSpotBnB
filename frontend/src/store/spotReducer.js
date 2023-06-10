import { csrfFetch } from "./csrf";

//variables for action type
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_ALL_SPOTS_USER = '/spots/getAllSpotsUser';
const GET_SPOT_ID = '/spots/getSpotId';
const CREATE_SPOT = '/spots/createSpot';
const EDIT_SPOT = '/spots/editSpot';
const DELETE_SPOT = '/spots/deleteSpot';

//action creator functions

const loadAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots: spots
    }
};

const loadAllSpotsUser = (spots) => {
    return {
        type: GET_ALL_SPOTS_USER,
        spots: spots
    }
};

const loadSpotId = (spot) => {
    return {
        type: GET_SPOT_ID,
        spot: spot
    }
};

const loadCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot: spot
    }
};

const loadEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot: spot
    }
};

const loadDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId: spotId
    }
};

// thunks

export const loadAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    
    if (response.ok) {
        const spots = await response.json();

        dispatch(loadAllSpots(spots));
        return spots;
    }

};


export const loadAllSpotsUserThunk = () => async (dispatch) =>  {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAllSpotsUser(spots));
        return spots;
    }
};

export const loadSpotIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    
    if (response.ok) {
        const spot = await response.json();

        dispatch(loadSpotId(spot));
        return spot;
    }
};

export const loadCreateSpotThunk = (spot) => async (dispatch) => {
      const { address, city, state, country, lat, lng, name, description, price, url } = spot;
  
      const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, city, state, country, lat, lng, name, description, price }),
      });
  
    if (response.ok) {
        const createdSpot = await response.json();
        const imageResponse = await csrfFetch(`/api/spots/${createdSpot.id}/images`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url,
                preview: true
            })
        })
        if (imageResponse.ok) {
            createdSpot.previewImage = url;
            dispatch(loadCreateSpot(createdSpot))
            return createdSpot 
        }     
    }  
};

// EDIT A SPOT --- /api/spots/:spotId
export const loadEditSpotThunk = (spot, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const updatedSpot = await response.json();
        console.log("upspot:", updatedSpot)
        const newlyUpdatedSpot = {...id, ...updatedSpot}
        console.log("new:", newlyUpdatedSpot)
        dispatch(loadEditSpot(newlyUpdatedSpot));
        return newlyUpdatedSpot;
    }
};

// DELETE A SPOT --- /api/spots/:spotId
export const loadDeleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(loadDeleteSpot(spotId));
    }
};

const initialState = {};
const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {...state};
            action.spots.Spots.forEach(spot => {newState[spot.id] = spot})
            return newState;
        }
        case GET_ALL_SPOTS_USER: {
            const newState = {...state};
            action.spots.Spots.forEach(spot => newState[spot.id] = spot)
            return newState
        }
        case GET_SPOT_ID: {
            const newState = {...state};
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case CREATE_SPOT: {
            const newState = {...state};
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case EDIT_SPOT: {
            const newState = {...state}
            newState[action.spot.id] = action.spot;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = {...state};
            delete newState[action.spotId];
            return newState;
        }
        default: {
            return state;
        }
    }
}


export default spotReducer