import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router";
import PrivateRoute from "../../containers/PrivateRoute";

const PrivateRouteViewer = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRouteViewer;
