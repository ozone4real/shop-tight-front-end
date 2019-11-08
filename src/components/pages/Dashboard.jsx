import React from 'react';
import DashBoardNav from '../ui-molecules/DashBoardNav';
import ProfilePage from './ProfilePage';
import OrdersPage from './OrdersPage';
import { Switch, Route, Redirect } from 'react-router-dom';

export default () => (
  <div className="dashboard-page">
    <div className="container">
    <section className="dashboard-container">
        <DashBoardNav />
        <Switch>
          <Route path="/dashboard/orders" component={OrdersPage} />
          <Route path="/dashboard/profile" component={ProfilePage} />
          <Redirect from="/dashboard" to="/dashboard/profile" />
        </Switch>
    </section>
    </div>
  </div>
)