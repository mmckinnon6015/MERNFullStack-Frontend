import { useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import React from "react";
import Card from "../partials/Card";
import { useBalancesContext } from "../hooks/useBalancesContext";
import { useAuthContext } from "../hooks/useAuthConext";

function DepositPage() {
   
  
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState('');  

    
  
    return (
      <Card
        bgcolor="dark"
        header="Deposit"
        status={status}
        body={show ? 
          <DepositForm setShow={setShow} setStatus={setStatus}/> :
          <DepositMsg setShow={setShow}/>}
      />
    )
  }
  
  function DepositMsg(props){
    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    return (<>
      <h5>User has Successfully Deposited into Their Account</h5>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}>
          Make Another Deposit
      </button>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => navigate(from)}>
          Go to Homepage
      </button>
    </>);
  } 
  
  function DepositForm(props){
    const { dispatch } = useBalancesContext();
    const { user } = useAuthContext();

    const [title]   = useState('Deposit');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([])
    
  
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
        setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
        setError(null)
        console.log('new deposit added', json)
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
        onChange={e => setAmount(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" >
          Deposit
      </button>
      {error && <div className="error">{error}</div>}
    </form>
    </>);
}

export default DepositPage