import React,{Fragment, useEffect, useState} from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from "@material-ui/core";
import "./Login.css"
import axios from "axios";
import cookies from '../CookieConfig';

const Login = ({setAuth}) => {
  
  const [inputs , setInput] = useState({
    email : "",
    password : ""
  })
  const [val ,setVal] = useState();

  const {email , password} = inputs 

  const changehandler = e => {
    setInput({...inputs , [e.target.name] : e.target.value});
  }


  const SubmittFormHandler = async e => {
    e.preventDefault();

    try {
      
      const body = {email , password} ;

      const response = await fetch("http://localhost:5000/auth/login",{
        method : "POST" ,
        headers : {"Content-Type" : "application/json"} ,
        body : JSON.stringify(body),
      })

      const parsedRes = await response.json();
      
      if(parsedRes.token){
        localStorage.setItem("token" , parsedRes.token)
        cookies.set("token", parsedRes.token);
        console.log(document.cookie) ;
         setAuth(true);
        toast.success("Logged IN succesfully");
      }
      else {
        setAuth(false)
        toast.error(parsedRes)
      }

    } catch (error) {
      
    }
  }
  

  return (<div className='contain'><div className='form-container'>
      <h1 className='txt'>Login</h1>
      <form onSubmit={SubmittFormHandler} className='form'>
        <input type="email" name="email" placeholder='email' value={email} onChange={changehandler} className='input'/>
        <input type="password" name="password" placeholder='password' value={password} onChange={changehandler} className='input'/>
        <button variant="contained" color="primary" className='button'>
          <div className='txt'>Submit</div>
        </button>
      </form>
      <Link to="/register"> Register </Link>
        </div></div>
      )
};

export default Login;
