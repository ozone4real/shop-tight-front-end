import { USER_CART, ADD_PRODUCT_TO_CART } from '../graphql/queries';
import { useMutation, useApolloClient, useLazyQuery } from '@apollo/react-hooks';


export default (history) => {
  const [ refetchCart ] = useLazyQuery(USER_CART, {
    fetchPolicy: 'cache-and-network',
     onCompleted() {
      history.push(localStorage.getItem('redirect_url') || '/')
     },
     onError() {
      history.push(localStorage.getItem('redirect_url') || '/')
     }
    })
  const client = useApolloClient();
  const { userCart } = client.readQuery({ query: USER_CART })
  const [ addProductToCart ] = useMutation(ADD_PRODUCT_TO_CART, {
    onCompleted(data) {
      client.writeData({
        data: { userCart: data.addProductToCart.userCart}
      })
      history.push(localStorage.getItem('redirect_url') || '/')
    },
    onError() {
      history.push(localStorage.getItem('redirect_url') || '/')
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