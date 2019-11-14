import React, { useState, useEffect } from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PAYMENT_OPTIONS, CREATE_ORDER } from '../../graphql/queries'
import { toast } from 'react-toastify';



export default ({ profileComplete, history }) => {
  const { data } = useQuery(PAYMENT_OPTIONS, {fetchPolicy: 'cache-and-network'})
  const [ createOrder ] = useMutation(CREATE_ORDER, {
    onCompleted( { createOrderWithoutPayment: { order: { id }  } } ) {
      history.push(`/orders/${id}`)
      toast.success('Order successfully placed')
    },
    onError() {
      toast.error('Request failed. Please try again')
    }
  })
  const [paymentOption, setPaymentOption] = useState(null)

  useEffect(() => {
    if(data) {
      setPaymentOption(data.paymentOptions[0].id)
    }
    
  }, [data]);

  const handleChange = (value) => {
    setPaymentOption(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createOrder({
      variables: {
        input: {
          paymentId: paymentOption
        }
      }
    })
  }

  if(!data) return <div></div>
  return (
    <form className="payment-options-form" onSubmit={handleSubmit}>
    <RadioGroup name="paymentOption" onChange={handleChange} selectedValue={paymentOption}>
      {data.paymentOptions.map((option) => (
      <div className="option" key={option.id}>
        <label><Radio value={option.id} disabled={!profileComplete} />
        <div><h3>{option.paymentType}</h3> <img src={option.picture} alt={option.paymentType} />
        <p className="text-light">{option.description}</p>
         </div>
        </label>
        </div>
        )
      ) }
    </RadioGroup>
    <button>Confirm Your Order</button>
    </form>
  )
}