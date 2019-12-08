import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { useMutation } from '@apollo/react-hooks';
import { SEND_VERIFICATION_MAIL } from '../../graphql/queries';
import { toast } from 'react-toastify';

export default ({ content }) => {
  const [ visibility, setVisibility ] = useState(true);
  const [ sendEmail, { loading } ] = useMutation(SEND_VERIFICATION_MAIL, {
    onCompleted({ sendVerificationMail: { message } }) {
      toast.success(message)
      setVisibility(false)
    },
    onError() {
      toast.error('An error occurred')
    }
  })

  const handleSendEmail = () => {
    sendEmail()
  }

  return (
    <div class="flash-container" style={{ display: visibility ? "block" : "none"  }}>
    <span class="close-btn" onClick={() => setVisibility(false)} ><FontAwesomeIcon icon="times-circle" /></span>
     <div>{ content ||
          <span>Your Account is unverified. To be able to order items, you would need to verify your account.
            <button onClick={handleSendEmail}>Send a verification link to my mail</button>
          </span>
        }
      </div>
   </div>
  )
}