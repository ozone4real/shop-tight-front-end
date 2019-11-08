import React, { useState, useEffect } from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import { useQuery } from '@apollo/react-hooks'
import { PAYMENT_OPTIONS } from '../../graphql/queries'


export default ({ profileComplete }) => {
  const { data } = useQuery(PAYMENT_OPTIONS, {fetchPolicy: 'cache-and-network'})
  const [paymentOption, setPaymentOption] = useState(null)

  useEffect(() => {
    if(data) {
      setPaymentOption(data.paymentOptions[0].id)
    }
    
  }, [data]);

  const handleChange = (value) => {
    setPaymentOption(value)
  }

  if(!data) return <div></div>
  return (
    <form class="payment-options-form">
    <RadioGroup name="paymentOption" onChange={handleChange} selectedValue={paymentOption}>
      {data.paymentOptions.map((option) => (
      <div class="option" key={option.id}>
        <label><Radio value={option.id} disabled={!profileComplete} />
        <div><h3>{option.paymentType}</h3> <img src={option.picture} alt={option.paymentType} />
        <p class="text-light">{option.description}</p>
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