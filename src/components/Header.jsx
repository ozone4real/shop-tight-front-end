import React from 'react'
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons'

const Header = () => (
  <header>
    <div className="header-container">
    <div className="left-sec">
    <div className="site-logo">
    <a href="/" className="no-underline"><h1>Shop-tight</h1></a>
    </div>
    </div>
    <div className="right-sec">
    <div className="search-bar">
      <SearchBar />
    </div>
    <div className="user-links" >
      <a href="/">Log in
      <FontAwesomeIcon
        icon={faCaretDown}
        />
        </a>
      <a href="/">
        <FontAwesomeIcon
        icon={faCartArrowDown}
        className= "cart-icon"
        size= 'lg'
        /> 
        My Cart
      </a>
    </div>
    </div>
    </div>
  </header>
)

export default Header