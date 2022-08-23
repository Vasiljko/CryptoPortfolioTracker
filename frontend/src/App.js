import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { TransactionView } from './components/TransactionView';




function App() {
  const [username, setUsername] = useState('')
  const [action, setAction] = useState('')
  const [crypto, setCrypto] = useState('')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionList, setTransactionList] = useState([])

  const showAllTransactions = () => {
    try{
      if(username === '')return;

      axios.get(`http://localhost:8000/api/user/${username}/transactions`).
      then(res => {console.log(res.data); setTransactionList(res.data);})
    } catch(err){
      console.log(err)
    }
  }

  const postTransaction = () => {
    try{
      //if (username === '' || !['BUY', 'SELL'].includes(action))
      axios.post(`http://localhost:8000/api/user/${username}/transactions`, {
        'action':action,
        'crypto':crypto,
        'price':price,
        'amount':amount
      }).
      then(res => console.log(res.data)).
      then(showAllTransactions())
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
      
      <div className='form-group mb-2'>
        <input placeholder='username' onChange={event => setUsername(event.target.value)}></input>
      </div>
      <div className='form-group mb-2'>
        <input placeholder='buy/sell' onChange={event => setAction(event.target.value)}></input>
      </div>
      <div className='form-group mb-2'>
        <input placeholder='crypto' onChange={event => setCrypto(event.target.value)}></input>
      </div>
      <div className='form-group mb-2'>
        <input placeholder='price' onChange={event => setPrice(event.target.value)}></input>
      </div>
      <div className='form-group mb-2'>
        <input placeholder='amount' pattern="^[0-9]*$" onChange={event => setAmount(event.target.value)}></input>
      </div>
      <div className='form-group mb-2'>
        <button onClick={postTransaction}>Send transaction</button>
      </div>

      <div className='form-group mb-2'>
        <button onClick={showAllTransactions}>Show all transactions</button>
      </div>
      {transactionList.map((obj, index) => {
        console.log(obj)
        return (<TransactionView key={index} id={index} action = {obj.action} crypto={obj.crypto} price={obj.price} amount={obj.amount}/>)
      })}
    </div>
  );
}

export default App;
