// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal/SignupForm";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Spots from "./components/Spots"
import SpotDetails from "./components/SpotDetail";
import CreateSpot from "./components/CreateSpot"
import EditSpot from "./components/EditSpot"
import Reviews from "./components/Reviews"
import CreateReview from "./components/SpotDetail/createReview";
import SpotsOwnedByUser from "./components/SpotsOwnedByCurrentUser";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots/create">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/ownerSpots">
            <SpotsOwnedByUser />
          </Route>
          <Route exact path="/spots/edit/:id">
            <EditSpot />
          </Route>
          <Route exact path="/spots/:id">
            <SpotDetails />
          </Route>
          <Route exact path="/user-reviews">
            <Reviews />
          </Route>
          <Route exact path="/create-review/:id">
            <CreateReview />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
