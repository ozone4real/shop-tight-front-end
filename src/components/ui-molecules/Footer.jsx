import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => (
  <footer>
    <div className="container">
      <div className="footer-container">
      <div>
        <Link to="/">About us</Link>
      </div>
      <div>
        <h3> <FontAwesomeIcon icon='envelope' /> Email Support</h3>
        <a href="mailto:shopright.mail@gmail.com?Subject=Hello">shopright.mail@gmail.com</a>
      </div>
      <div>
        <h3> <FontAwesomeIcon icon='phone' /> Phone Contacts</h3>
        <a href="tel:093993330033003">093993330033003</a>
      </div>
    </div>
    </div>
  </footer>
)