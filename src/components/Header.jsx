import React, {useEffect, Fragment} from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { InMemoryCache } from 'apollo-cache-inmemory';
import { Link } from 'react-router-dom';
import { useApolloClient } from "@apollo/react-hooks";
import { USER } from '../graphql/queries';


const Header = () => {
  const client = useApolloClient()
  const { data, loading, error } = useQuery(USER)
  console.log(data)
  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    client.resetStore()
  }

  return (
    <header>
      <div className='header-container'>
          <div className='site-logo'>
            <Link to='/' className='no-underline'>
              <h1> <FontAwesomeIcon icon='shopping-bag' /> <span>Shop-right</span></h1>
            </Link>
          </div>
          <div className='search-bar'>
            <SearchBar />
          </div>
          <div className='user-links'>
          <div className="account-links-cont">
              <div className="account-links">
                <FontAwesomeIcon icon='user-alt' size={'lg'} />
          { 
            loading || !data.user.isLoggedIn ? <Link to='/signup'>Sign Up</Link> 
            : (
                <Fragment><span>Hi, {data.user.firstName}</span>
                <FontAwesomeIcon icon='caret-down' />
                <ul>
                <li><Link to='/'>My Profile</Link></li>
                  <li><Link to='/'>My Orders</Link></li>
                  {
                    data.user.isAdmin &&
                    <Fragment> 
                      <li><Link to="/registerProduct">Register Product</Link></li>
                      <li><Link to="/addCategory">Add Category</Link></li>
                    </Fragment>
                  }
                  <li><Link to='/' onClick={handleLogOut}>Log out</Link></li>
                  </ul>
                  </Fragment>
                  )}
                  </div>
                  </div>
            <Link to='/'>
              <FontAwesomeIcon
                icon={['fas', 'shopping-cart'] }
                size={'lg'}
                className='cart-icon'
              
              />
              <span>My Cart</span>
            </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
