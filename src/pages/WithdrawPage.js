import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import React from "react";
import Card from "../partials/Card";
import { useBalancesContext } from "../hooks/useBalancesContext";
import { useAuthContext } from "../hooks/useAuthConext";


function WithdrawPage() {
   
  
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');  
  
    return (
      <Card
        bgcolor="dark"
        header="Withdraw"
        status={status}
        body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
          <WithdrawMsg setShow={setShow}/>}
      />
    )
  }
  
  function WithdrawMsg(props){
    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    return (<>
      <h5>User Successfully Withdrawn from Their Account</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Make Another Withdraw
      </button>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => navigate(from)}>
          Go to Homepage
      </button>
    </>);
  } 
  
  function WithdrawForm(props){
    const { dispatch } = useBalancesContext();
    const { user } = useAuthContext();

    const [title, setTitle]   = useState('Withdraw');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!user) {
        setError('You must be logged in')
        return
      }

      const balance = {title, amount}

      const response = await fetch('https://michael-mckinnon-badbank-35227911d091.herokuapp.com/api/balances', {
        method: 'POST',
        body: JSON.stringify(balance),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
      }
      if (response.ok) {
        setError(null)
        console.log('new withdraw added', json)
        dispatch({type: 'CREATE_BALANCE', payload: json})
      }

      props.setStatus('');      
      props.setShow(false);
    }
  
    return(<>
    <form className="create-form" onSubmit={handleSubmit}>
  
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter amount" 
        value={amount} 
        onChange={e => setAmount(e.currentTarget.value)}
        required
        min="0"/><br/>
        
      <button type="submit" 
        className="btn btn-light" >
          Withdraw
      </button>
      {error && <div className="error">{error}</div>}
    </form>
    </>);
}

export default WithdrawPage