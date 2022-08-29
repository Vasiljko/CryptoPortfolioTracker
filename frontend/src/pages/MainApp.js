import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import TransactionView from '../components/TransactionView';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { Table } from 'react-bootstrap';
import { Navigate, useNavigate  } from 'react-router-dom'

function MainApp() {
  const [username, setUsername] = useState('')
  const [action, setAction] = useState('')
  const [crypto, setCrypto] = useState('')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionList, setTransactionList] = useState([])

  const showAllTransactions = async () => {
    try{
      if(username === '')return;

      await axios.get(`http://localhost:8000/api/user/${username}/transactions`)
      .then(res => {setTransactionList(res.data);})
    } catch(err){
      console.log(err)
    }
  }

  const showCryptoPrice = () =>{
    try{
      if (crypto === '')return;
      axios.get(`http://localhost:8000/api/crypto_price/${crypto}`)
      .then(res => {
        console.log(res);
        if((res.data).toString().startsWith("0"))setPrice((res.data).toFixed(6));
        else setPrice((res.data).toFixed(2));
      })
    }catch(err){
      console.log(err)
    }
  }

  const postTransaction = async () => {
    try{
      if (username === '' || !['BUY', 'SELL'].includes(action)) return;

      const crypto_price = await axios.get(`http://localhost:8000/api/crypto_price/${crypto}`)
      .then(res => {
        if((res.data).toString().startsWith("0")) return (res.data).toFixed(6);
        else return (res.data).toFixed(2);
      })

      setPrice(crypto_price)

      const date = new Date()
      const datetime = date.getFullYear()+'-'+String(date.getMonth()).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0')
                        +' '+String(date.getHours()).padStart(2,'0')+':'+String(date.getMinutes()).padStart(2,'0')

      await axios.post(`http://localhost:8000/api/user/${username}/transactions`, {
        'action':action,
        'crypto':crypto,
        'price':parseFloat(crypto_price),
        'amount':amount,
        'datetime':datetime
      })
      .then(res => setTransactionList(res.data))

    } catch(err){
      console.log(err)
      if(err.response.data){
        console.log(err.response.data)
      }
    }
  }

    const navigate = useNavigate();
    const editTransaction = (props) =>{
        navigate(`user/${props.username}/transaction/${props.index}`)
    }

    const deleteTransaction = async (props) => {
        await axios.delete(`http://localhost:8000/api/user/${props.username}/transactions/${props.index}`)
        .then(res => setTransactionList(res.data))    
    }

    return (
        <div>
            <h1 className="pb-3">Cryptfolio</h1>
            <div className='form-group mb-2'>
                <TextField id="outlined-basic" label="Username" variant="outlined" size="small" onChange={event => setUsername(event.target.value)}/>
            </div>
            <div className='form-group mb-2'>
                <TextField id="outlined-basic" label="Action" variant="outlined" size="small" onChange={event => setAction(event.target.value)}/>
            </div>
            <div className='form-group mb-2'>
                <TextField id="outlined-basic" label="Crypto" variant="outlined" size="small" onChange={event => setCrypto(event.target.value)}/>
            </div>
            <div className='form-group mb-2'>
                <TextField id="outlined-basic" label="Amount" variant="outlined" size="small" onChange={event => setAmount(event.target.value)}/>
            </div>
            <div className='form-group mb-2'>
              <h4>Price is {price}</h4>
            </div>
            
            <div className='form-group mb-2'>
            <Button startIcon={<SendIcon />} size="small" color="primary" variant="contained" onClick={() => postTransaction()}
                    style={{maxWidth: '250px', maxHeight: '30px', minWidth: '250px', minHeight: '30px', justifyContent: "flex-start"    }}>
                    Send transaction
            </Button>
            </div>
            <div className='form-group mb-2'>
            <Button startIcon={<SendIcon />} size="small" color="primary" variant="contained" onClick={() => showAllTransactions()}
                    style={{maxWidth: '250px', maxHeight: '30px', minWidth: '250px', minHeight: '30px', justifyContent: "flex-start"}}>
                    Show all transactions
            </Button>
            </div>
            <div className='form-group mb-2'>
            <Button startIcon={<SendIcon />} size="small" color="primary" variant="contained" onClick={() => showCryptoPrice()}
                    style={{maxWidth: '250px', maxHeight: '30px', minWidth: '250px', minHeight: '30px', justifyContent: "flex-start"}}>
                    Show crypto price
            </Button>
            </div>

<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Buy/Sell</th>
          <th>Date</th>
          <th>Crypto</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Edit</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {transactionList.map((obj, index) => {
            return (<tr key={index}>
                <td>{index}</td>
                <td>{obj.action}</td>
                <td>{obj.datetime}</td>
                <td>{obj.crypto}</td>
                <td>{obj.price}</td>
                <td>{obj.amount}</td>
                <td><Button  startIcon={<EditIcon />} size="small" color="primary" variant="contained" onClick={() => editTransaction({username, index})}></Button></td>
                <td><Button  startIcon={<DeleteIcon />} size="small" color="primary"  variant="contained" onClick={() => deleteTransaction({username, index})}></Button></td>
            </tr>)
        })}
       
      </tbody>
    </Table>
        </div>
    )
}

export default MainApp;