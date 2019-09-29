import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { Link } from 'react-router-dom'

export default ({history}) => (
  <div className="auth-page">
  <div className="container">
  <div className="auth-container">
    <h3>Create An Account</h3>
  <SignUpForm history={history} />
  <h5>Already have an account?</h5>
  <Link to="/login">Log In</Link>
  </div>
  </div>
  </div>
)