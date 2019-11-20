import React from 'react'
import SignUpForm from '../ui-molecules/SignUpForm'
import { Link } from 'react-router-dom'
import SiteLogo from '../ui-molecules/SiteLogo'

export default ({history}) => (
  <main className="auth-page">
  <div className="container">
    <center><SiteLogo /></center>
  <div className="auth-container">
    <h3>Create An Account</h3>
  <SignUpForm history={history} />
  <h5>Already have an account?</h5>
  <Link to="/login">Log In</Link>
  </div>
  </div>
  </main>
)