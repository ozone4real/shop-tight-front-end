import React, { useState } from 'react'
import Input from './Input'
import { signUpFormSchema, validationMessages } from '../utils/validator'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export default () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const client = useApolloClient()

  const SIGN_UP_USER = gql`
    mutation createUser($user: CreateUserInput!) {
      createUser(input: $user) {
        user {
          firstName
          lastName
          email
          isAdmin
        }
        token
        message
      }
    }
  `

  const [errors, setErrors] = useState({})
  const [
    signup,
    { loading }
  ] = useMutation(SIGN_UP_USER, {
    variables: { user: { userAttributes: data } },
    onCompleted ({ createUser: { token } }) {
      localStorage.setItem('token', token)
      client.writeData({ user: { isLoggedIn: true } })
    },
    onError (e) {
      if (e.message.match(/422/)) setErrors({ email: 'Email already taken' })
    }
  })

  const handleChange = ({ target }) => {
    const key = target.name
    const value = target.value
    // if(!value) setErrors({...errors, [key]: `${key} cannot be blank`})
    setErrors({ ...errors, [key]: '' })
    setData({ ...data, [key]: value })
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
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        id='firstName'
        name='firstName'
        type='text'
        value={data.firstName}
        onBlur={handleBlur}
        error={errors.firstName}
      />

      <Input
        onChange={handleChange}
        id='lastName'
        name='lastName'
        value={data.lastName}
        type='text'
        onBlur={handleBlur}
        error={errors.lastName}
      />

      <Input
        onChange={handleChange}
        id='email'
        name='email'
        type='email'
        value={data.email}
        onBlur={handleBlur}
        error={errors.email}
      />

      <Input
        onChange={handleChange}
        id='password'
        name='password'
        value={data.password}
        type='password'
        onBlur={handleBlur}
        error={errors.password}
      />
      <button> {loading ? '...loading' : 'Submit'}</button>
    </form>
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
