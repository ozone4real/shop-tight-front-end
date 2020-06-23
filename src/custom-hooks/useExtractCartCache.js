import { USER_CART, ADD_PRODUCT_TO_CART } from '../graphql/queries';
import { useMutation, useApolloClient, useLazyQuery } from '@apollo/react-hooks';

export default (history) => {
  const redirectUrl = localStorage.getItem('redirect_url')
  const redirect = () => {
    localStorage.removeItem('redirect_url')
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
  console.log(userCart)
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
            input: { quantity: item.quantity, productDetailId: item.product.productId }
          }
        }) 
      })
      return
    }
    refetchCart()
  }
}