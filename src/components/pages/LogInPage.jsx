import React from 'react'
import LogInForm from '../ui-molecules/LogInForm'
import { Link } from 'react-router-dom'

export default ({history}) => (
  <main className="auth-page">
  <div className="container">
  <div className="auth-container">
    <h3>Log In</h3>
  <LogInForm history={history} />
  <h5>Don't have an account?</h5>
  <Link to="/signup">Create One Now</Link>
  </div>
  </div>
  </main>
)