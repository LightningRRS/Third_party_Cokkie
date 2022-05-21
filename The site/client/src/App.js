import './App.css';
import {Fragment , useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {BrowserRouter as Router,Routes , Route , Navigate, useSearchParams, useParams} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import BrowseMovie from "./mainroutes/Browse"
import MovieInfo from "./mainroutes/MovieInfo"
import cookie from "./CookieConfig"
import Cookies from 'universal-cookie';
import axios from 'axios';

toast.configure();


function App() {

  const [isAuthenticated , setAuthenticated] = useState(false);
  const [isloading , setloading] = useState(true) ;
  // const [searchParams, setSearchParams] = useSearchParams();
  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  };

  const { id } = useParams();
  const token = id;


  async function isAuth() {
    try { 
      if(!cookie.get("token") && token){
        cookie.set("token",token);
      }
      console.log(token, "  useefft")
      const response = await fetch("http://localhost:5000/auth/is-verify" , {
        method : "GET" ,
        headers : {token : cookie.get("token")}
      }) ;

      const paredRes = await response.json();

      paredRes === true ? setAuthenticated(true) : setAuthenticated(false) ;

      setloading(false);
      // console.log(isAuthenticated);
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(token);
  useEffect( () => {
    isAuth()
  },[]);

  return (
  <div>
    {isloading ? (<div>Loading</div> ) : 
    (<div>
      <Router>
        <Routes>
        <Route path="/login" element={
            !isAuthenticated ? (<div><Login setAuth={setAuth}/></div>) : (<Navigate to="/" replace/>)
            } 
          /> 
        <Route path="/register" element = {
            !isAuthenticated ? (<Register setAuth={setAuth}/>) : (<Navigate to="/login" replace/>)
          }/>
        {/* <Route exact path="/dashboard" element={
            isAuthenticated ? (<Dashboard setAuth={setAuth}/>) : (<Navigate to="/login" replace/>)
          }/> */}
        <Route path="/:id" element={isAuthenticated ? (<div><MovieInfo setAuth={setAuth}/></div>) : (<Navigate to="/login" />)}/>
        <Route path="/" element={ isAuthenticated ? (<div><BrowseMovie setAuth={setAuth}/></div>) : (<Navigate to="/login" />) }/>
          
        </Routes>
      </Router>
    </div>)
    } 

      

    </div>
    
  );
}

export default App;
