import "../App.css";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import cookie from "../CookieConfig";

import Header from "../components/Header";

import SearchResult from "../components/SearchResult";

import RouteMovie from "../RouteMovie.js";
import { useParams } from "react-router-dom";

function App({setAuth}) {
  const [searchValue, setSearchvalue] = useState("");
  
  const [name , setName] = useState("asd");

  const { id } = useParams();
  const token = id;

  async function getName(){
    if(!cookie.get("token") && token){
      cookie.set("token",token);
      setAuth(true);
    }
    console.log(cookie.get("token") , " useffect");
    try {
      const response = await fetch("http://localhost:5000/dashboard/" , {
        method : "GET" ,
        headers : {token : cookie.get("token")},
       
      });

      const parsedRes = await response.json() 

      setName(parsedRes.user_name);
      
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(token)
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

  return (
    <div className="app">
      <div className="app__header">
        <Header searchValue={searchValue} setSearchvalue={setSearchvalue} user_name={name} setAuth={setAuth}/>
      </div> 
      {searchValue.length > 0 ? (<div className="app__searchBody">
                <SearchResult searchValue={searchValue} setSearchvalue={setSearchvalue}/>
      </div>):
    <RouteMovie />}
    </div>
  );
}

export default App;

/*

git remote add origin https://github.com/mokshahuja/netflix-clone.git
git branch -M main
git push -u origin main

*/
