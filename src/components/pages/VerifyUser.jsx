import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { VERIFY_USER, USER } from '../../graphql/queries';

export default ({ history, location }) => {

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  if(!token) {
    toast.error('Verification failed')
    return history.push('/')
  }

  const client = useApolloClient()
  const [ verifyUser ] = useMutation(VERIFY_USER, {
    onCompleted( { verifyUser: { token } }) {
      localStorage.setItem('token', token)
      const { user } = client.readQuery({ query: USER })
      client.writeData({
        data: {
          user: {
            ...user, verified: true
          }
        }
      });
      toast.success('Account successfully verified')
      history.push('/')
    },

    onError(e) {
      toast.error('Verification failed')
      console.error(e)
      history.push('/')
    }
  });
  


  useEffect(() => {
    verifyUser({
      variables: {
        input: {
          token
        }
      }
    })
  }, [])

  return (
    <div class="container">
      <h2> ......Verifying your account </h2>
    </div>
  )
}