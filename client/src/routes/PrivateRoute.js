import React from "react";
import { Route } from "react-router-dom";
import {ROUTES} from "../constants/routes"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import DefaultLayout from "../layout";
import { LOCAL_STORAGE } from "../constants/localstorage";

const PrivateRoute = (props) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  return (
    <>
      {accessToken ? (
        <DefaultLayout>
          <Route {...props} />
        </DefaultLayout>
      ) : (
        <Route
          render={(props) => (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: props.location },
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default PrivateRoute;
