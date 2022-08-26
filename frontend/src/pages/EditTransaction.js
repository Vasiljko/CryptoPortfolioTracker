import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';

function EditTransaction(props) {
    const params = useParams();

    const [action, setAction] = useState('')
    const [crypto, setCrypto] = useState('')
    const [price, setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const [transactionList, setTransactionList] = useState([])
    
    const editTransaction = async () => {
        const crypto_price = await axios.get(`http://localhost:8000/api/crypto_price/${crypto}`)
        .then(res => {
            if((res.data).toString().startsWith("0")) return (res.data).toFixed(6);
            else return (res.data).toFixed(2);
        })
        setPrice(crypto_price)
        await axios.put(`http://localhost:8000/api/user/${params.username}/transactions/${params.transaction_id}`, {
        'action':action,
        'crypto':crypto,
        'price':parseFloat(crypto_price),
        'amount':amount
      })
      .then(res => console.log(res))
    }
    /*useEffect(() => {

    }, [])*/

    return (
        <div>
            <h3>Edit transaction {params.transaction_id} for user {params.username}</h3>

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
            <Button startIcon={<SendIcon />} size="small" color="primary" variant="contained" onClick={() => editTransaction()}
                    style={{maxWidth: '250px', maxHeight: '30px', minWidth: '250px', minHeight: '30px', justifyContent: "flex-start"    }}>
                    Send transaction
            </Button>
            </div>

        </div>
    )
}

export default EditTransaction;