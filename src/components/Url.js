import {useState } from 'react';
import './longUrl.css'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UrlShort(){
  const [url ,setUrl ] = useState('')
  const [newUrl , setNewUrl] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('https://url-shorten.onrender.com/url' , {url : url})
      setUrl('')
      setNewUrl(response.data.data.shortUrl)
      toast.success((response.data.message) ,{theme : 'dark', position: "top-center"})
      // alert(response.data.message)

    }catch(err){
      console.log(err)
      setUrl('')
      setNewUrl('')
      // toast.error('Something Wrong' , {theme : 'red'})
      if(err.message == 'Network Error') toast.error('Something Went Wrong' , {theme : 'red'})
      err.response.data.status == false ? toast.error((err.response.data.message) ,{theme : 'dark', position: "top-center"}): 
      toast.error('Something Wrong' , {theme : 'red'})
      // toast.success((response.data.message) ,{theme : 'dark', position: "top-center"})
      // alert('Something Wrong !')
    }
  }

    return (
      <>
      <div>
    <marquee behavior="" direction="left-right"> URL - SHORTENER </marquee>
        <div className='urlDiv container mt-2'>
            <form className="container mt-5 " method='POST'>
      <div className="mb-3 ">
      <label htmlFor="exampleInputEmail1" className="custom" id='heading'>Enter Your Long Url Here</label>
      <input type="text" value={url} className="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp"onChange={(e)=> setUrl(e.target.value)} />
  </div>

  <button type="submit" className="btn btn-primary btn1" onClick={onSubmit}>Submit</button>
</form>

{
  newUrl!=='' ? <h3 style={{
    textAlign:"center" ,
    // display:'inline' , 
    width : "70vw",
    color : "silver", 
    // background
    backgroundImage: "linear-gradient(direction, color-stop1, color-stop2, ...)",
    marginTop : "2%",
    // margin : "auto"
    
    }} >{newUrl}</h3> : ''
}
        </div>
      </div>
      <ToastContainer />
      </>
   )
}