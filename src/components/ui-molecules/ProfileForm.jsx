import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { PROFILE, UPDATE_PROFILE } from '../../graphql/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Input from '../ui-molecules/Input';
import usePrepareUserData from '../../custom-hooks/usePrepareUserData';
import { trimValues } from '../../utils/helperMethods';

export default ({ buttonLabel, setProfileComplete }) => {
  const { data: userData, loading } = useQuery(PROFILE, { fetchPolicy: 'cache-and-network'} )
  const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: '',
    state: '',
    phone: '',
    country: '',
    postalCode: ''
  }

  const [ updateProfile, { loading: updatingProfile } ] = useMutation(UPDATE_PROFILE, {
    onCompleted({ updateUser: { message } }) {
      toast.success(message)
      setProfileComplete && setProfileComplete(true)
    },
    onError(e) {
      toast.error(e.message)
    }
  })

  const { handleChange, handleBlur, errors, data, setData } = usePrepareUserData(initialState)
  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile({
      variables: { user: { userAttributes: trimValues(data) } }
    })
  }
  

  useEffect(() => {
    if(userData && userData.profile) {
      const dataClone = { ...data }
      let profileComplete = true
      const profileData = Object.keys(dataClone).reduce((acc, next) => {
        acc[next] = userData.profile[next] || ''
        if(!acc[next]) profileComplete = false
        return acc
      } , {} )
      setProfileComplete && setProfileComplete(profileComplete)
      setData(profileData)
    }
  }, [userData])

  return (
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
      <Input
        label='First Name'
        onChange={handleChange}
        id='firstName'
        name='firstName'
        type='text'
        value={data.firstName}
        onBlur={handleBlur}
        error={errors.firstName}
      />

      <Input
        label='Last Name'
        onChange={handleChange}
        id='lastName'
        name='lastName'
        value={data.lastName}
        type='text'
        onBlur={handleBlur}
        error={errors.lastName}
      />

      <Input
        label='Email'
        onChange={handleChange}
        id='email'
        name='email'
        type='email'
        disabled
        value={data.email}
        onBlur={handleBlur}
        error={errors.email}
      />

      <Input
        label='Phone'
        onChange={handleChange}
        id='phone'
        name='phone'
        value={data.phone}
        type='number'
        onBlur={handleBlur}
        error={errors.phone}
      />

      <Input
        label='Address'
        onChange={handleChange}
        id='address'
        name='address'
        value={data.address}
        type='text'
        onBlur={handleBlur}
        error={errors.address}
      />
      <Input
        label='City'
        onChange={handleChange}
        id='city'
        name='city'
        value={data.city}
        type='text'
        onBlur={handleBlur}
        error={errors.city}
      />
      <Input
        label='State'
        onChange={handleChange}
        id='state'
        name='state'
        value={data.state}
        type='text'
        onBlur={handleBlur}
        error={errors.state}
      />
      <Input
        label='Country'
        onChange={handleChange}
        id='country'
        name='country'
        value={data.country}
        type='text'
        onBlur={handleBlur}
        error={errors.country}
      />
      <Input
        label='Postal Code'
        onChange={handleChange}
        id='postalCode'
        name='postalCode'
        value={data.postalCode}
        type='text'
        onBlur={handleBlur}
        error={errors.postalCode}
        required={false}
      />
      <button> {buttonLabel} </button>
      </form>
    </div>
  )
}