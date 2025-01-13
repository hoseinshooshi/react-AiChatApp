import React from 'react'
import './signin.css'
import { SignIn } from '@clerk/clerk-react'
const Singin = () => {
  return (
    <div className='sign-in'>
        <SignIn path='/sign-in' signUpUrl='/sign-up' forceRedirectUrl='/dashboard'/>
    </div>
  )
}

export default Singin