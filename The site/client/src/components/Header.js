import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { toast } from "react-toastify";
import cookie from "../CookieConfig";

import "./Header.css";

const Header = ({ searchValue, setSearchvalue ,user_name ,setAuth }) => {
  const [isClicked, setClicked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchvalue(e.target.value);
  };
  console.log(searchValue);

  const logout = e => {
    e.preventDefault()
    localStorage.removeItem("token");
    cookie.remove("token");
    setAuth(false);
    toast.success("Logged out succesfully")
  }

  return (
    <div className={`app__header ${show && "app__headerBlack"}`}>
      <div>
        <a href="/">
          <img
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
          />
        </a>
      </div>

      {isClicked && (
        <div className="app__headerInput">
          <input
            className="app__headerSearch"
            placeholder="Search"
            value={searchValue}
            onChange={handleInputChange}
          />
          <Button
            onClick={() => {
              setClicked(false);
              setSearchvalue("");
            }}
          >
            <HighlightOffIcon color="secondary" />
          </Button>
        </div>
      )}

      <div className="app__headerOptions">
        <Button
          size="small"
          className="app__headerSearchIcon"
          onClick={() => setClicked(!isClicked)}
        >
          <SearchIcon color="error" />
        </Button>
        Welcome {user_name}
        <Button
          size="small"
          className="app__headerSearchIcon"
          onClick={e => logout(e)}
        >
          <ExitToAppIcon color="error" />
        </Button>
        
      </div>
    </div>
  );
};

export default Header;
//http://www.omdbapi.com/?s=toy&apikey=f2b88761
//omdb api key = f2b88761, s is movie keyword
