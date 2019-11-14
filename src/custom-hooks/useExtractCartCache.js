import { USER_CART, ADD_PRODUCT_TO_CART } from '../graphql/queries';
import { useMutation, useApolloClient, useLazyQuery } from '@apollo/react-hooks';
import { toast } from 'react-toastify';


export default (history) => {
  const redirectUrl = localStorage.getItem('redirect_url')
  const redirect = () => {
    localStorage.removeItem('redirect_url')
    toast.success('Welcome to Shop Right. A verification link has been sent to your email. Please follow the link to verify your account.')
    history.push(redirectUrl || '/')
  }
  const [ refetchCart ] = useLazyQuery(USER_CART, {
    fetchPolicy: 'cache-and-network',
     onCompleted() {
      redirect()
     },
     onError() {
      redirect()
     }
    })
  const client = useApolloClient();
  const { userCart } = client.readQuery({ query: USER_CART })
  const [ addProductToCart ] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted(data) {
      client.writeData({
        data: { userCart: data.addProductToCart.userCart}
      })
      redirect()
    },
    onError() {
      redirect()
    }
  })
  return () => {
    if(userCart.length) {
      userCart.forEach((item) => {
        addProductToCart({
          variables: { 
            input: { quantity: item.quantity, productDetailId: item.productDetail.id }
          }
        }) 
      })
      return
    }
    refetchCart()
  }
}