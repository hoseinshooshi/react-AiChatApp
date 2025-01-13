import React, { useState } from 'react'
import './form.css'
import Upload from '../Upload/Upload'
import { IKImage } from 'imagekitio-react'
import model from '../../lib/gemini'
import Markdown from 'react-markdown'
import { useRef } from 'react'
import { useEffect } from 'react'
import SingleChatpage from '../../Routes/SingleChatPage/SingleChatpage'
import AnimatedButton from "../AnimatedButton/AnimatedButton"
import { useMutation, useQueryClient } from '@tanstack/react-query'
const Form = (
  {prmpt, setPrompt,addmessage,messages, data}
) => {

  const [answer, setAnswer] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;
    add(text, false);
  }
  const [img, setImg] = useState({
    err: "", 
    isLoading: false, 
    dbData: {}, 
    aiData: {}
  })
  const add = async (text, isInitial) =>{
    if(!isInitial) setPrompt(text)
    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData,text] : [text]
    );  
    let acumalatedAnswer = ''; 
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      acumalatedAnswer += chunkText
      setAnswer(acumalatedAnswer);
    }
    mutation.mutate()
    console.log(answer)
    setImg(
      {
        err: "", 
        isLoading: false, 
        dbData: {}, 
        aiData: {}
      }
    )
    if(response) {
       addmessage({
        userMessage: prmpt,
        AiRespond: answer,
        id: Date.now()
      })
    }
    console.log(messages)
  }
const endRef = useRef(null);
useEffect(
      () => {
        endRef.current.scrollIntoView({
          behavior: "smooth"
        })
      }
    ,[
      img.dbData, answer, prmpt,data
])
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn:(text)=> {
    return (
       fetch(`http://localhost:3000/api/chats/${data._id}`, {
        method:"PUT", 
        credentials: "include",
        headers:{
          "Content-Type" : "application/json"
        }, 
        body:JSON.stringify({prmpt, answer, img: img.dbData?.filePath})
      }).then((res)=>res.json())
    )
  }, 
  onSuccess: (id) => {
    queryClient.invalidateQueries({queryKey:['chat', data._id]}).then(()=> {
      setPrompt(""), 
      setAnswer(""),
      setImg({
        isLoading: false, 
        err: "", 
        dbData: {},
        aiData: {}, 
      })
    })
  }
})
const chat = model.startChat({
    history:[
      {
        role: "user", 
        parts: [
          {
            text:"Hello, i have two dogs in ,y house"
          }
      ]
      },
      {
        role: "model", 
        parts: [
          {
            text:"great to meet"
          }
        ]
      },
    ],
    generationConfig:{
      // maxOutputTokens:100,
    }
   });
const hasRun = useRef(false)
useEffect(()=> {
  if (!hasRun.current) {

    if(data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true)
    }
  }
  hasRun.current = true
}, [])
  return (
    <div className='wrapperForm'>
      <div
      className='form' >
          {img.isLoading && (
              <div className="loader">
                <span className="loader-text">loading</span>
                <span className="load"></span>
              </div>
          )}
          {answer&& 
          <div className="parent">
            <div className='message'>
              <Markdown>
              {answer}
              </Markdown>
            </div>
          </div>}
          <div className="ednChat">
            <div ref={endRef} />
            {
            img.dbData?.filePath && (
              <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT_URL}
            path={img.dbData?.filePath}
            width="380"
            transformation={[{ width: 380 }]}
            />
            )
          }
          </div>
          <form action=""
          onSubmit={handleSubmit}
          
          >
          {/* <label htmlFor="file">
              <img
              src="/attachment.png"
              alt="" />
          </label> */}
          <input
            type="file"
            multiple={false}
            hidden
            id="file"
            />
          <input type="text" placeholder="Write here..." name="text" className='form-input'
            value={prmpt} onInput={(e) =>setPrompt(e.target.value)}
            />
              <AnimatedButton prmpt={prmpt} onClick={handleSubmit} />
          </form>
      </div>
    </div>
  )
}

export default Form