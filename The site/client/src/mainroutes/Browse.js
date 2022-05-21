import "../App.css";
import { useEffect, useState } from "react";
import Row from "../components/Row";
import Axios from "axios";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SearchResult from "../components/SearchResult";
import { toast } from 'react-toastify';
import cookie from "../CookieConfig";

function Browse({setAuth}) {
    const [genres, setGenres] = useState([]);
    const [searchValue, setSearchvalue] = useState("");
  
    useEffect(() => {
      async function fetchdata() {
        const promise = await Axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US"
        );
  
        // console.log(promise.data.genres);
        setGenres(promise.data.genres);
      }
  
      fetchdata();
    }, []);

    const [name , setName] = useState("asd");

  async function getName(){
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
        
        { searchValue.length > 0 ? (
                <div className="app__searchBody">
                  
                  <SearchResult searchValue={searchValue} />
                </div>
              ) :
              (
                <div className="app__body">
                  <Banner />
                  <div className="app__movieRows">
                    {genres.map((genre) => (
                      <Row key={genre.id} title={genre.name} id={genre.id} />
                    ))}
                  </div>
                </div>
              )
        }
      </div>
    );
  }

  export default Browse;