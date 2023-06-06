import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from './components/Spots/index'
import SpotDetails from "./components/Spots/SpotDetails/SpotDetails";

function App() {
  document.title = "HotSpot-Bnb";
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
        <Route exact path={`/spots/:spotId`}>
          <SpotDetails />
        </Route>
      </Switch>}
    </>
  );
}

export default App;