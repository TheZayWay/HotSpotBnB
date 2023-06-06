// frontend/src/index.js
import React from "react";

import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { loadAllSpotsThunk, loadAllSpotsUserThunk, loadSpotIdThunk, loadEditSpotThunk, loadDeleteSpotThunk } from "./store/spotReducer";

const store = configureStore();
//to test if thunks are working 
// store.dispatch(loadAllSpotsThunk());
// store.dispatch(loadAllSpotsUserThunk()); // if this is being called must stay logged in or will get an error
// const spotId = 6
// const spotId2 = 4
// store.dispatch(loadSpotIdThunk(spotId));
// store.dispatch(loadEditSpotThunk())
// store.dispatch(loadDeleteSpotThunk(spotId2))

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);