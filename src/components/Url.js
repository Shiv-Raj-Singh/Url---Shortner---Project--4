import {useState } from 'react';
// import ReactDOM from 'react-dom/client';
import './url.css'
import axios from 'axios'

const body = document.body
const headingColor  = document.getElementById('heading')

setInterval(()=>{
    const red = parseInt(Math.random() * 126)     
    const green = parseInt(Math.random() * 126)     
    const blue = parseInt(Math.random() * 126)     
    const rgb = `rgb(${red} , ${green} , ${blue})`
    const rgb2 = `rgb(${green} ,${blue}, ${red} )`

    headingColor.style.color = rgb
    body.style.background = rgb2
  
}, 5000 )

export default function UrlShort(){
  const [url ,setUrl ] = useState('')
  const [newUrl , setNewUrl] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5000/url' , {url : url})
      setUrl('')
      setNewUrl(response.data.data.shortUrl)
      console.log(newUrl)
      alert(response.data.message)
      
      // e.mainInput.value = ''
    }catch(err){
      console.log(err)
      alert(err.response.data.message)
    }
  }


    return (
      <>
        <marquee behavior="" direction="left-right"><h2> URL - SHORTENER </h2>  </marquee>
        <div className='urlDiv container mt-2'>
            <form className="container mt-5 " method='POST'>
  <div className="mb-3 ">
    <label for="exampleInputEmail1" className="h1 custom" id='heading'>Enter Url Here !</label>
    <input type="text" value={url} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={(e)=> setUrl(e.target.value)} />
  </div>

  <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
</form>

{
  newUrl!=='' ? <h1 style={{textAlign:"center" , color : "darkRed"}} >{newUrl}</h1> : ''
}
        </div>
      </>
   )
}