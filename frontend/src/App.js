import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from './components/Spots/index'
import SpotDetails from "./components/Spots/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm/CreateSpot";
import UpdateSpot from "./components/Spots/UpdateSpot/UpdateSpot";
import UserSpots from "./components/Spots/UserSpots/UserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <hr></hr>  
      {isLoaded && 
      <Switch>
        <Route exact path="/">
          <Spots />
        </Route>
        <Route path='/spots/:spotId/edit'>
            <UpdateSpot />
        </Route>
        <Route path='/spots/:spotId'>
          <SpotDetails />
        </Route>
        <Route exact path='/spotss/new'>
          {/* remember to fix link to go to /spots/new */}
            <CreateSpotForm />
        </Route>
        <Route path='/users/:userId/spots'>
            <UserSpots />
        </Route>
        
      </Switch>}
    </>
  );
}

export default App;