export const signUpFormSchema = {
  email: /^[a-z0-9][a-z0-9-.]+[a-z0-9]+@([a-z]+\.)+[a-z]{2,20}$/,
  firstName: /^[\w-]+$/,
  lastName: /^[\w-]+$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})$/,
  address: /.+/,
  city: /.+/,
  country: /.+/,
  postalCode: /\d{3,}/,
  state: /.+/,
  phone: /^\d{7,20}$/
};

export const validationMessages = {
  email: 'Please enter a valid email address',
  firstName: 'First name cannot be blank',
  lastName: 'Last name cannot be blank',
  password:
    'Password must contain alphabets and numbers and must be at least 8 characters long',
  confirmPassword: 'Passwords don\'t match',
  postalCode: 'Please enter a valid postal code',
  address: 'Address cannot be blank',
  city: 'City cannot be blank',
  country: 'Country cannot be blank',
  state: 'Country cannot be blank',
  phone: 'Please enter a valid phone number'
};
