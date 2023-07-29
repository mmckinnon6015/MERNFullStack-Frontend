import { useState } from 'react'
import React from 'react';
import Card from '../partials/Card';
import { useLogin } from '../hooks/useLogin';
import { useNavigate, useLocation } from 'react-router-dom'

function LoginPage () {
    
  const [show, setShow]     = useState(true);
  const [status, setStatus] = useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  return(<>
    <h5>User Did Not Log In</h5>
    <button type="submit" 
        className="btn btn-light" 
        onClick={() => navigate(from)}>
          Create an Account
      </button>
      <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Try to Authenticate Again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin()

  

  const handle = async (e) => {
    e.preventDefault()
   await login(email, password)
   props.setShow(false);
     
  }


  return (<>

<form name="LoginForm" onSubmit={handle} >
        
        Email address<br/>
        <input type="input" 
          className="form-control" 
          placeholder="Enter email" 
          value={email} 
          onChange={e => setEmail(e.currentTarget.value)}
          required
          /><br/>
    
        Password<br/>
        <input type="password" 
          className="form-control" 
          placeholder="Enter password" 
          value={password} 
          onChange={e => setPassword(e.currentTarget.value)}
          required
          /><br/>
    
          <button type="submit" 
          className="btn btn-light" 
          disabled={isLoading}
          >Login</button>
          {error && <div className='error'>{error}</div>}
      </form>
   
  </>);
}

export default LoginPage