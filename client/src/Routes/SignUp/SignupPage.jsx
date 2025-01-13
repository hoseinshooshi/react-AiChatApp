import React from 'react'
import './signup.css'
import { SignUp } from '@clerk/clerk-react'
const SignupPage = () => {
  return (
    <div className='sign-up'>
      <SignUp appearance={{variables: {
        colorBackground: "#ced3d1", 
        fontFamilyButtons: "Ubuntu",
        fontFamily: "Ubuntu", 
        colorInputBackground: "#e5e8e7",
         
      }}} path="/sign-up" signInUrl='/sign-in'/> 
    </div>
  )
}

export default SignupPage