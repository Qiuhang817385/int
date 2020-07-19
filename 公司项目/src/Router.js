import React, { Suspense } from 'react'
import { Provider } from 'react-redux';
import store from './store';
import RouteWithSubRoutes from './RouteWithSubRoutes'
import Spin from './Spin'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/Home';
import Page1 from './page/page1/Page1';
import Page2 from './page/page2/Page2';

import routes from './routes';


function RouterAll () {
  return (
    <Provider store={store}>
      <Router>
        <Suspense>
          <Switch>
            {
              routes && routes.map((route, index) => {
                <RouteWithSubRoutes key={index} {...route} />
              })
            }
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default hot(module)(RouterAll)