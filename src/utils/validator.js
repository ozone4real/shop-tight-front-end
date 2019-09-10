export const signUpFormSchema = {
  email: /^[a-z0-9][a-z0-9-.]+[a-z0-9]+@([a-z]+\.)+[a-z]{2,20}$/,
  firstName: /^[\w-]+$/,
  lastName: /^[\w-]+$/,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})$/
};

export const validationMessages = {
  email: 'Please enter a valid email address',
  firstName: 'First name cannot be blank',
  lastName: 'Last name cannot be blank',
  password:
    'Password must contain alphabets and numbers and must be at least 8 characters long',
  confirmPassword: 'Passwords don\'t match'
};
