const onUploadStart = evt => {
    console.log("Start", evt);
    const file = evt.target.files[0];
    const reader = new FileReader()
    file.onloadend = () =>{
      setImg((prevValue)=> ({...prevValue, isLoading: true, aiData:
        {
          inlineData: {
          data: reader.result.split(",")[1], 
          mimeType: file.type
        }}, 
      }))

    }
    reader.readAsDataURL(file);
  }