import React from 'react'
import './homepage.css'
import {Link} from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';
const HomePage = () => {
  const [imgChange, setImgChange] = useState('human'); 
  const testbacj = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/test`, 
      {credentials: "include",} 
      
    )
  }
  return (
    <div className='home-page'>
      <div className="left">
        <h1>
          YACHIRU'S AI
        </h1>
        <h2>
          Unleash your creativity
        </h2>
        <h3>
          this project is merely a practise of mine for using GEMINI API
           and some other practises the source code is availible on my github
        </h3>
        <div className="button">
          <Link to='/dashboard'>Get Started</Link>
        </div>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="background"></div>
          </div>
          <img src="/robot.png" alt="" className="bot" />
          <div className="chatAnimation">
            <img src={`/${imgChange}.png`} alt="" />
            <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'HUMAN: can you tell me how to login?',
                  1000, () => {
                    setImgChange("robot")
                  }, 
                  'AI: use the get started button',
                  1000, () => {
                    setImgChange("14avatar-4-8")
                  }, 
                  'HUMAN: what should i use to logim?',
                  1000,() => {
                    setImgChange("robot")
                  }, 
                  'AI: your google account or email address',
                  1000, () => {
                    setImgChange("14avatar-4-8")
                  }
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '14px', display: 'inline-block', fontFamily: 'monospace' }}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
              />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/yachiruLogo.png" alt="" />
        <div className='links'>
          <Link to='/'>Terms and Conditions</Link>
          <span>||</span>
          <Link to='/'>Privacy and Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage