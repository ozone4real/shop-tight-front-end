import React from 'react';
import { NavLink } from 'react-router-dom';
import ReviewIcon from '../../assets/icons/rating';
import OrdersIcon from '../../assets/icons/purchase';
import AvatarIcon from '../../assets/icons/avatar2';

export default () => (
  <div className="dashboard-nav">
    <NavLink className="profile" to="/dashboard/profile" activeClassName="path-active" >
      <AvatarIcon /> <span>My Profile</span>
    </NavLink>
    <NavLink className="profile" to="/dashboard/orders" activeClassName="path-active">
      <OrdersIcon /> <span>My Orders</span>
    </NavLink>
    <NavLink className="profile" to="/dashboard/pending-reviews" activeClassName="path-active">
      <ReviewIcon /> <span>Pending Reviews</span>
    </NavLink>
  </div>
)