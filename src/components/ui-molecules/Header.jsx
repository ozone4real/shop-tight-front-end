import React, {Fragment} from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchBar from './SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from '../../assets/icons/avatar'
import CartIcon from '../../assets/icons/shopping-cart'
import { Link } from 'react-router-dom';
import { useApolloClient } from "@apollo/react-hooks";
import { USER } from '../../graphql/queries';


const Header = () => {
  const client = useApolloClient()
  const { data, loading } = useQuery(USER)
  
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
                <Avatar />
          { 
            loading || !data.user.isLoggedIn ? <Link to='/signup'>Sign Up</Link> 
            : (
                <Fragment><span>{data.user.firstName}</span>
                <FontAwesomeIcon icon='caret-down' />
                <ul>
                <li><Link to='/'>My Profile</Link></li>
                  <li><Link to='/'>My Orders</Link></li>
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
            <Link to='/'>
              <CartIcon />

              <span> My Cart</span>
            </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
