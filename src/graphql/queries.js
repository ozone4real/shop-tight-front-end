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
  }`

export const CREATE_CATEGORY = gql`
  mutation createCategory($category: CreateCategoryInput!) {
  createCategory(input: $category) {
    category {
      categoryName
      categoryDescription
      urlKey
    }
  }
}`

export const CATEGORIES = gql`
  {
  categories {
    categoryDescription
    categoryName
    urlKey
    id
    images
    subCategories {
      categoryDescription
      categoryName
      urlKey
      id
      }
    
  }
}`

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

export const CREATE_SUB_CATEGORY = gql`
  mutation createSubCategory($subCategory: CreateSubCategoryInput!){
    createSubCategory(input: $subCategory) {
      subCategory {
        category {
        categoryName
        categoryDescription
        urlKey
        }
        categoryName
        categoryDescription
      }
    }
  }`

export const FETCH_SUB_CATEGORIES = gql`
{
subCategories {
  categoryDescription
  categoryName
  id
  images
  }
}`

export const CATEGORY =  gql`
  fragment Category on Category{
      id
      urlKey
      categoryName
      categoryDescription
      images
  }
`

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($category: UpdateCategoryInput!) {
  updateCategory(input: $category) {
    category {
      categoryName
      categoryDescription
      urlKey
    }
  }
}`

export const CREATE_PRODUCT = gql`
mutation createProduct($product: CreateProductInput!) {
  createProduct(input: $product){
    product {
      productName,
      urlKey,
      productDetails {
        id
      }  
    }
  }
}`

export const PRODUCT = (id) => (
  gql`
  {
  product(id: ${id}) {
      productName
      productSize
      productDescription
      images
      brand
    productDetails {
      id
      size
      color
      quantitySold
      priceInNaira
      discountedPriceInNaira
      urlKey
      quantityInStock
      }
    subCategory {
      categoryName
      urlKey
    }
  }
}
`)

export const PRODUCT_COLLECTION = (page=1, limit=7, sortParam) => (
  gql`
{
  productCollection(page: ${page}, limit: ${limit}, sortParam: ${sortParam}) {
    brand
    productName
    images
    discount
    productDescription
    urlKey
    productDetails {
      id
      discountedPriceInNaira
      priceInNaira
    }
  }
}`
)