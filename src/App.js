import Navi from './partials/Navi';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage'
import WithdrawPage from './pages/WithdrawPage'
import DepositPage from './pages/DepositPage'
import BalancePage from './pages/BalancePage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './hooks/useAuthConext';

function App() {
const { user } = useAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
    <div className='pages'>
    <Navi />
        <div className='container'>
          <Routes>
            {/* index = /  reddit.com */}
            <Route index element={user ? <HomePage /> : <Navigate to="/createaccount" />} />
            <Route path='/withdraw' element={user ? <WithdrawPage /> : <Navigate to="/login" />} />
            <Route path='/deposit' element={user ? <DepositPage /> : <Navigate to="/login" />} />
            <Route path='/balance' element={user ? <BalancePage/> : <Navigate to="/login" />} />
            <Route path='/createaccount' element={!user ? <CreateAccountPage/> : <Navigate to="/" />} />
            <Route path='/login' element={!user ? <LoginPage/> : <Navigate to="/" />} />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  </div>
  )
}


    
  



export default App;
