import gql from 'graphql-tag';

export const SIGN_UP_USER = gql`
    mutation createUser($user: CreateUserInput!) {
      createUser(input: $user) {
        user {
          firstName
          lastName
          email
          isAdmin
          verified
        }
        token
        message
      }
    }
  `

export const USER = gql`
{
  user @client{
    isLoggedIn
    verified
    firstName
    isAdmin
  }
}`

export const LOG_IN_USER = gql`
    mutation signInUser($user: SignInUserInput!) {
      signInUser(input: $user) {
        user {
          firstName
          lastName
          email
          isAdmin
          verified
        },
        token
      }
    }`

export const FETCH_SUB_CATEGORIES = gql`
{
subCategories {
  categoryDescription
  categoryName
  id
  }
}
` 
export const CREATE_PRODUCT = gql`
mutation createProduct($product: CreateProductInput!) {
  createProduct(input: $product){
    product {
      productName,
      urlKey
      
    },
    productDetails {
      id
    }
  }
}
`