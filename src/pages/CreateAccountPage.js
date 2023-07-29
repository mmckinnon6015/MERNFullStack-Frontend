import { useState, } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import React from 'react';
import Card from '../partials/Card';
import { useSignup } from '../hooks/useSignup';



function CreateAccountPage() {

    
    const [show, setShow] = useState(true);
    const [status] = useState('');


    
    return (
      <Card
        bgcolor="dark"
        header="Create Account"
        status={status}
        body={show ? 
          <CreateForm setShow={setShow}/> : 
          <CreateMsg setShow={setShow}/>}
      />
    )
  }
  
  function CreateMsg(props){
    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/login" } };
     

    return(<>
      <h5>User Did Not Create an Account</h5>
    <button type="submit" 
        className="btn btn-light" 
        onClick={() => navigate(from)}>
          Log into an Account
      </button>
      <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Try to Create an Account Again
    </button>
  </>);
  }
  
  function CreateForm(props){
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignup()
    
     
  
    const handle = async (e) => {
      e.preventDefault()
      await signup(email, password)
      props.setShow(false);
    }    
  
    return (<>
  
    <form name="createAcctForm" onSubmit={handle} >
        
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}
        required
        /><br/>
  
      Password<br/>
      *must include special character*<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}
        minLength="8"
        /><br/>
  
        <button type="submit" 
        className="btn btn-light" 
        disabled={isLoading}
        >Create Account</button>
        {error && <div className='error'>{error}</div> }
    </form>
  
    </>);
  }

  export default CreateAccountPage;