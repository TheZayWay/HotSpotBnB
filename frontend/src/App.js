import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from './components/Spots/index'
import SpotDetails from "./components/Spots/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/Spots/CreateSpotForm/CreateSpot";
import ManageSpots from "./components/Spots/ManageSpots/ManageSpots";
import UpdateSpot from "./components/Spots/UpdateSpot/UpdateSpot";

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
        <Route exact path='/spots/:spotId/edit'>
            <UpdateSpot />
        </Route>
        <Route exact path='/spots/new'>
            <CreateSpotForm />
        </Route>
        <Route exact path="/spots/current">
          <ManageSpots />
        </Route>
        <Route exact path='/spots/:spotId'>
          <SpotDetails />
        </Route>    
      </Switch>}
    </>
  );
}

export default App;