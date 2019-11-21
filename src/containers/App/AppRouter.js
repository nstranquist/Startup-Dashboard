import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('../../containers/Dashboard/index.js')),
  },
  {
    path: 'profile',
    component: asyncComponent(() => import('../../containers/UserSettings')),
  },
  {
    path: 'scholarships',
    component: asyncComponent(() => import('../../acomponents/tables/ScholarshipsList')),
  },
  {
    path: 'schools',
    component: asyncComponent(() => import('../../containers/Tables/antTables')),
  },
  {
    path: 'schools/:id',
    component: asyncComponent(() => import('../../containers/Calendar/Booking')),
  },
  {
    path: 'matches',
    component: asyncComponent(() => import('../../containers/Tables/antTables')),
  },
  {
    path: 'applications',
    component: asyncComponent(() => import('../../containers/Forms/editor')),
  },
  {
    path: 'housing',
    component: asyncComponent(() => import('../../containers/Forms/allComponents')),
  },
  {
    path: 'notifications',
    component: asyncComponent(() => import('../../containers/UserNotification/index.js')),
  },
  {
    path: 'settings',
    component: asyncComponent(() => import('../../containers/UserSettings/index.js')),
  },
  {
    path: 'scholarships/:id',
    component: asyncComponent(() => import('../../containers/ListingDetail/index.js')),
  },


];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <RestrictedRoute
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              isLoggedIn={this.props.isLoggedIn}
              loadingAuth={this.props.loadingAuth}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

const RestrictedRoute = ({ component: Component, loadingAuth, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isLoggedIn || (isLoggedIn && loadingAuth)) ? (
        <Component {...props} />
        
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AppRouter;
