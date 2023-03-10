import { useContext, useEffect, useState } from 'react';
import './App.css';
import './polyfills.js';

// import jwt from 'jsonwebtoken';
 import { useJwt } from 'react-jwt';
import { Context } from './Context/Context';

function App() {
  const {
    molida, 
    blanda,
    setIsLogin : setIsLogin,
    islogin : islogin,
  } = useContext(Context);
  console.log(molida);
  const [value, setValue] = useState('')
  const [valuePass , setValuePass] = useState('')
  const [ token, setToken] = useState('')

  useEffect(()=>{
    const session = localStorage.getItem('session')
    if (session) {
      setToken(session)
    }
  }, [])

  const { decodedToken, isExpired} = useJwt(token);
  console.log(decodedToken);

  


const handleLogin = (event) => {
  event.preventDefault();
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: value, password: valuePass })
  };

  fetch('https://backend-login-puce.vercel.app/', requestOptions)
    .then(response => response.json())
    .then(data => {
      //window.localStorage.setItem('session', data.token)
      //console.log(data)
      if (data.token){
        setIsLogin(true)
        setToken(data.token)
        localStorage.setItem('session', data.token);
      }
      
    })
    .catch(error => setIsLogin(error));
    setValue('');
    setValuePass('');

  }

  return (
    <div className="login-page">
    <div className="form">
    {islogin ? `Hola ${decodedToken?.username} ` : 'Porfavor loegueate'}
      <form className="login-form" onSubmit={handleLogin}>
        <input onChange={(event) => setValue(event.target.value)} type="text" placeholder="username" />
        <input onChange={(event) => setValuePass(event.target.value)} type="password" placeholder="password" />
        <button>login</button>
        <p className="message">Not registered? <a href="#">Create an account</a></p>
      </form>
    </div>
  </div>
  );
}

export default App;
