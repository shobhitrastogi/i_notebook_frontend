import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials,setcredentials]=useState({name: '',
  email: '',
  password: '',
  cpassword: '',})
  let navigate = useNavigate();
  const handleClick=async(e)=>{
      const {name,email,password}=credentials
     e.preventDefault();
      const url= "http://localhost:5000/api/auth/createuser"
     const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({name,email,password})
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
  return (
  <>
    <h2 className='mt-3'>Create an Account  to use  Inotebook its your personal  notebook</h2>
  <form onSubmit={handleClick}>
  <div className="mb-3 container" > 
  <div className="mb-3">
    <label htmlFor="name"className="form-label">Name</label>
    <input type="name"className="form-control" id="name" name='name'  onChange={onChange}/>
  </div>
    <label htmlFor="email"className="form-label">Email address</label>
    <input type="email"className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp"className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password"className="form-label">Password</label>
    <input type="password"className="form-control" name='password' onChange={onChange} id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password"className="form-label">ConfirmPassword</label>
    <input type="cpassword"className="form-control" name='cpassword' onChange={onChange} id="cpassword"/>
  </div>

  <button type="submit"className="btn btn-primary">Submit</button>
</form>
  </>
  )
}

export default Signup