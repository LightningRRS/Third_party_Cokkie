import React , {useState} from 'react';
import { Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import "./Login.css"
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const Register = ({setAuth}) => {

    const [inputs , setInputs] = useState({
        email : "",
        password : "",
        name : ""
    })

    const {email , password , name} = inputs

    const changehandler = (e) => {
        setInputs({...inputs , [e.target.name] : e.target.value});
    }

    const SubmittFormHandler = async (e) => {
        e.preventDefault();
        try {
            const body = {email , password , name} ;

            const response = await fetch("http://localhost:5000/auth/register" , {
                method : "POST",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(body),
                withCredentials: true
            })

            const parsedRes = await response.json();

            if(parsedRes.token){
        // saving in local storage
            localStorage.setItem("token" , parsedRes.token)
            cookie.set("token" , parsedRes.token);
            setAuth(true);
            toast.success("Registered successfully")
            }
            else{
                setAuth(false);
                toast.error(parsedRes);
            }
           
        } catch (error) {
            console.log(error.message);
        }
    }

  return <div className='contain'><div className='form-container'>
      <h1 className='txt'>Register</h1>
      <form onSubmit={SubmittFormHandler} className='form'>
          <input type="text" name="email" placeholder="email" value={email} onChange={ changehandler} className='input'/>
          <input type="password" name="password" placeholder="pass" value={password} onChange={ e => changehandler(e)} className='input'/>
          <input type="text" name="name" placeholder="name" value={name} onChange={ e => changehandler(e)} className='input'/>
        <button variant="contained" color="primary" className='button'>
          <div className='txt'>Submit</div>
        </button>
        <Link to="/login"> Login </Link>
      </form>
      
  </div></div>
};

export default Register;
