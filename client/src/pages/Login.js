import React,{useState, useContext} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContex';

function Login() {
    const [ username, setUserName] = useState('');
    const [ password, setPassword] = useState('');
    const {setAuthState} = useContext(AuthContext); 
    let navigate = useNavigate();
    const login = () =>{
        const data = {username: username, password: password}
        axios.post('http://localhost:3001/auth/login',data).then((response)=>{
            if(response.data.error){ 
              alert(response.data.error);
            }else {
              localStorage.setItem("accessToken", response.data);
              setAuthState(true);
              navigate('/');
            }
            
        });
    };

  return (
    <div className='loginContainer'>
        <input type='text' onChange={(event) =>{setUserName(event.target.value)}}/>
        <input type='password'onChange={(event) =>{setPassword(event.target.value)}}/>

        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login