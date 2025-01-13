import React, { useEffect, useRef } from 'react'
import './singlechatpage.css'
import Form from '../../components/Form/Form';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader'
import {useQuery} from '@tanstack/react-query'
import {useLocation} from 'react-router-dom'
import Markdown from 'react-markdown';
const SingleChatpage = () => {
    const path = useLocation().pathname;
    const chatId = path.split("/").pop();
    const [prmpt, setPrompt] = useState("")
    const [messages, setMessages] =useState([]); 
    function addmessage(msg) {
      setMessages((prevState) => [...prevState, msg]);
    }
    const { isPending, error, data } = useQuery({
      queryKey: ['chat', chatId],
      queryFn: async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      },
    });
console.log(error)
console.log(data)
  return (
    <div
    className='chatpage'> 
      {isPending && <div className='wrapperLoader'><Loader /></div>}
      <div className="wrapper">
        <div className="chat">
          {
            data?.history?.map((message, i )=> (
            <div className={message.role === "user" ? "message-user" : "message"} key={i}>
              <Markdown>{message.parts[0].text}</Markdown>
            </div> ))
          }
{/*           
          <div className="message">
            ai test message
          </div> */}
          {/* {prmpt
                   && 
                    <div className='message-user'>{prmpt}</div>} */}
          {data &&
            <Form
            prmpt={prmpt}
            setPrompt={setPrompt}
            addmessage={addmessage}
            messages={messages}
            data={data}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default SingleChatpage