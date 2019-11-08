import { useState } from 'react';
import { signUpFormSchema, validationMessages } from '../utils/validator';

export default (initialState) => {
  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    const key = target.name
    const value = target.value
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
  return { handleChange, handleBlur, data, errors, setErrors, setData }
}