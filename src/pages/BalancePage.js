import React from "react";
import Card from "../partials/Card";
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import BalanceDetails from '../components/BalanceDetails'
import { useBalancesContext } from "../hooks/useBalancesContext";
import { useAuthContext } from "../hooks/useAuthConext"


const BalancePage = () => {
    const [show, setShow]     = useState(true);
    const [status, setStatus] = useState(''); 

    return (
        <Card
          bgcolor="dark"
          header="Database Users"
          status={status}
          body={show ? 
            <BalanceForm setShow={setShow} setStatus={setStatus}/> :
            <BalanceMsg setShow={setShow}/>}
        />
      )
    }
    
    function BalanceMsg(props){
      return (<>
        <h5>All Transactions on User's Account</h5>
      </>);
    } 
    
    function BalanceForm(props){
        const {balances, dispatch} = useBalancesContext()
        const {user} = useAuthContext()

    useEffect(() => {
        const fetchBalances = async () => {
            const response = await fetch('https://michael-mckinnon-badbank-35227911d091.herokuapp.com/api/balances/', {
                headers: {
                'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_BALANCES', payload: json})
            }
        }
        
        if (user) {
            fetchBalances()
        }
        
    }, [dispatch, user])

    return (
        <div className="Balance">
            <div className="balances">
                {balances && balances.map((balance) => (
                    <BalanceDetails key={balance._id} balance={balance} />
                ))}
            </div>
           
        </div>
    )
}

export default BalancePage

