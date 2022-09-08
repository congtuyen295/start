import React from "react";
import { Route } from "react-router-dom";
import DefaultLayout from "../layout";


const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <DefaultLayout>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </DefaultLayout>
  );
};

export default PublicRoute;
