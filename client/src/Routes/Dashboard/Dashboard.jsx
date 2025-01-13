import React from 'react'
import './dashboard.css'
import {useAuth} from "@clerk/clerk-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
const  {userId} = useAuth()
const queryClient = useQueryClient();
const navigate = useNavigate()
const mutation = useMutation({
  mutationFn:(text)=> {
    return (
       fetch(`http://localhost:3000/api/chats`, {
        method:"POST", 
        credentials: "include",
        headers:{
          "Content-Type" : "application/json"
        }, 
        body:JSON.stringify({text:text, userId:userId})
      }).then((res)=>res.json())
    )
  }, 
  onSuccess: (id) => {
    queryClient.invalidateQueries({queryKey:['userChats']})
    navigate(`/dashboard/chats/${id}`)
  }
})
async function handleFormSubmit(e) {
  e.preventDefault();

  const text = e.target.text.value
  if (!text) return;        
  mutation.mutate(text)
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text, userId: userId }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log("Chat saved successfully:", result);
        } catch (err) {
          console.error("Error while saving chat:", err.message);
        }
        
  }
  return (
    <div className='dashboard'>
      <div className="texts">
        <div className="logo">
          <img src="yachiruLogo.png" />
          <h1>
            YACHIRU AI
          </h1>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
         <input type="text" placeholder="Write here..." name="text" className='form-input'
          />
          <button
          className='frm-btn'
          type='submit'
          >
            <img src="/up-right-arrow.png" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard