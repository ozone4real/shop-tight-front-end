import React, {Fragment} from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '../../assets/icons/avatar2'
import CartIcon from '../../assets/icons/shopping-cart'
import { Link } from 'react-router-dom';
import { useApolloClient } from "@apollo/react-hooks";
import { USER, USER_CART } from '../../graphql/queries';
import SiteLogo from './SiteLogo'


const Header = () => {
  const client = useApolloClient()
  const { data, loading } = useQuery(USER)
  const { data: cartData } = useQuery(USER_CART, {fetchPolicy: data.user.isLoggedIn ? 'cache-and-network' : 'cache'})
  console.log(cartData)
  
  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    client.resetStore()
  }

  return (
    <header>
      <div className='header-container'>
        <SiteLogo />
          {/* <div className='site-logo'>
            <Link to='/' className='no-underline'>
              <h1> <FontAwesomeIcon icon='shopping-bag' /> <span>Shop-right</span></h1>
            </Link>
          </div> */}
          <div className='search-bar'>
            <SearchBar />
          </div>
          <div className='user-links'>
          <div className="account-links-cont">
              <div className="account-links">
                <Avatar />
          { 
            loading || !data.user.isLoggedIn ? <Link to='/signup'>Sign Up</Link> 
            : (
                <Fragment><span>{data.user.firstName}</span>
                <FontAwesomeIcon icon='caret-down' />
                <ul>
                <li><Link to='/dashboard/profile'>My Profile</Link></li>
                  <li><Link to='/dashboard/orders'>My Orders</Link></li>
                  {
                    data.user.isAdmin &&
                    <Fragment> 
                      <li><Link to="/registerProduct">Register Product</Link></li>
                      <li><Link to="/addCategory">Add Category</Link></li>
                      <li><Link to="/addSubCategory">Add Sub-category</Link></li>
                    </Fragment>
                  }
                  <li><Link to='/' onClick={handleLogOut}>Log out</Link></li>
                  </ul>
                  </Fragment>
                  )}
                  </div>
                  </div>
            <Link to='/cart'>
            <span className="cart-link"><CartIcon />
            {cartData &&
             cartData.userCart.length ?
              <span className="cart-items-count">
                {cartData.userCart.reduce((current, next) => (current + next.quantity), 0)}
                </span> : ''
              }
                </span>
              <span> My Cart</span>
            </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
