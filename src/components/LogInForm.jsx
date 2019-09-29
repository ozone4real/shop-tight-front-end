import React, { useState, Fragment } from 'react'
import Input from './Input'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { LOG_IN_USER } from '../graphql/queries'

export default ({history}) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const client = useApolloClient()
  const [errors, setErrors] = useState({})
  const [
    login,
    { loading, error }
  ] = useMutation(LOG_IN_USER, {
    variables: { user: data },
    onCompleted ({ signInUser: { token, user } }) {
      localStorage.setItem('token', token)
      client.writeData(
        {
          data: {
            user: {...user, isLoggedIn: true}
          }
        })
      history.push(localStorage.getItem('redirect_url') || '/')
    },
    onError (e) {
      if (e.message.match(/401/)) setErrors({ email: 'Invalid Email Or Password' })
    }
  })

  const handleChange = ({ target }) => {
    const key = target.name
    const value = target.value
    setData({ ...data, [key]: value.trim() })
  }

  const handleSubmit = e => {
    e.preventDefault()
    login()
  }

  return (
    <Fragment>
    <div className="log-in-form">
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        id='email'
        name='email'
        type='email'
        value={data.email}
        error={errors.email}
        placeholder='Email'
      />

      <Input
        onChange={handleChange}
        id='password'
        name='password'
        value={data.password}
        type='password'
        placeholder='Password'
        error={errors.password}
      />
      <div><button> {loading ? '...loading' : 'Submit'}</button></div>
    </form>
    {/* <button onClick={handleClick}>Click me</button> */}
    </div>
    </ Fragment>
  )
}
