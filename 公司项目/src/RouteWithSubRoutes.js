import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Roo = (route) => {
  if (route.redirect) {
    return (
      <Redirect
        from={route.path}
        to={route.redirect}
        exact={route.exact}
        strict={route.strict}
      ></Redirect>
    )
  }
  return (
    <Route
      path={route.path}
      exact={route.exact || false}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    ></Route>
  )
}
export default Roo