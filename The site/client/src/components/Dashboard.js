import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cookie from '../CookieConfig';

const Dashboard = ({setAuth}) => {

  const [name , setName] = useState("asd");

  async function getName(){
    try {
      const response = await fetch("http://localhost:5000/dashboard/" , {
        method : "GET" ,
        headers : {token : cookie.get("token")}
      });

      const parsedRes = await response.json() 

      setName(parsedRes.user_name);
      
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getName()
  },[])

  const logout = e => {
    e.preventDefault()
    localStorage.removeItem("token");
    cookie.remove("token");
    setAuth(false);
    toast.success("Logged out succesfully")
  }

  return <div>
      <h1>Dashboard {name}</h1>
    <button onClick={e => logout(e)}>
      Logout
    </button>
  </div>;
};

export default Dashboard;

