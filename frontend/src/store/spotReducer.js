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
        console.log(spots)
        console.log(spots)
        dispatch(loadAllSpots(spots));
        return spots;
    }
};
loadAllSpotsThunk()

export const loadAllSpotsUserThunk = () => async (dispatch) =>  {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();

        dispatch(loadAllSpotsUser(spots));
        return spots;
    }
};

export const loadSpotIdThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/:${spotId}`);

    if (response.ok) {
        const spot = await response.json();

        dispatch(loadSpotId(spot));
        return spot;
    }
};

export const loadCreateSpotThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST'
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(loadCreateSpot(data));
        return data;
    }
};

export const loadEditSpotThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/:spotId', {
        method: 'PUT'
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(loadEditSpot(data));
        return data;
    }
};

export const loadDeleteSpotThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/:spotId', {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(loadDeleteSpot(data));
        return data;
    }
};

const initialState = {};
// const spotReducer = (state = initialState, action) => {}


// export default spotReducer