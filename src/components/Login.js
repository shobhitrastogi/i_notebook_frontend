import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';


const Login = () => {
  const [credentials,setcredentials]=useState({email:"" , password:""})
  let navigate = useNavigate();
    const handleClick=async(e)=>{
     e.preventDefault();
      const url= "http://localhost:5000/api/auth/login"
     const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
      });
      const json =await response.json()

      if(json.success){

        // save the auth token and redirect 
        localStorage.setItem('token',json.authtoken)
        navigate('/')
      } else{
        // kuch ni
      }   

      console.log(json)
    }
    const onChange= (e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (<>
  <h2 className='mt-3'>Loging to continue to Inotebook its your notebook</h2>
  <form onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} minLength={5} required onChange={onChange} name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"name='password' minLength={5} required onChange={onChange} value={credentials.password} id="password"/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  </>
  )
}

export default Login