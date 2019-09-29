import React, { useState, Fragment } from 'react'
import Input from './Input'
import { signUpFormSchema, validationMessages } from '../utils/validator'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { SIGN_UP_USER } from '../graphql/queries'

export default ({history}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const client = useApolloClient()

  const [errors, setErrors] = useState({})
  const [
    signup,
    { loading }
  ] = useMutation(SIGN_UP_USER, {
    variables: { user: { userAttributes: data } },
    onCompleted ({ createUser: { token, user } }) {
      
      // client.writeData({ user: { isLoggedIn: true, data: user } })
      client.writeData(
        {
          data: {
            user: {...user, isLoggedIn: true}
          }
        })
        history.push(localStorage.getItem('redirect_url') || '/')
    },
    onError (e) {
      if (e.message.match(/422/)) setErrors({ email: 'Email already taken' })
    }
  })

  const handleChange = ({ target }) => {
    const key = target.name
    const value = target.value
    setErrors({ ...errors, [key]: '' })
    setData({ ...data, [key]: value.trim() })
  }

  const handleBlur = ({ target }) => {
    const key = target.name
    const value = target.value
    if (!value) { return setErrors({ ...errors, [key]: `${key} cannot be blank` }) }
    if (!signUpFormSchema[key].test(value)){
      setErrors({ ...errors, [key]: validationMessages[key] })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate(errors)) return
    signup()
  }

  return (
    <Fragment>
    <div className="sign-up-form">
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        id='firstName'
        name='firstName'
        type='text'
        value={data.firstName}
        onBlur={handleBlur}
        error={errors.firstName}
        placeholder='First Name'
      />

      <Input
        onChange={handleChange}
        id='lastName'
        name='lastName'
        value={data.lastName}
        type='text'
        onBlur={handleBlur}
        error={errors.lastName}
        placeholder='Last Name'
      />

      <Input
        onChange={handleChange}
        id='email'
        name='email'
        type='email'
        value={data.email}
        onBlur={handleBlur}
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
        onBlur={handleBlur}
        error={errors.password}
      />
      <div><button> {loading ? '...loading' : 'Submit'}</button></div>
    </form>
    </div>
    </ Fragment>
  )
}

function validate (errors) {
  let isValid = true
  Object.values(errors).forEach(error => {
    if (error) {
      isValid = false
    }
  })
  return isValid
}
