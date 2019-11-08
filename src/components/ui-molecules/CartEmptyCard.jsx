import React from 'react';
import EmptyCart from '../../assets/icons/empty-cart';
import { Link } from 'react-router-dom'

export default () => (
<div className="empty-cart-card text-lighter">
<EmptyCart />
<h1>Your cart is empty! </h1>
<Link to="/">Start shopping now </Link>
</div>
)