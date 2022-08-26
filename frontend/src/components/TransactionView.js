import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Navigate, useNavigate  } from 'react-router-dom'

export function TransactionView(props){
    const navigate = useNavigate();
    const  editTransaction = () =>{
        navigate(`user/${props.username}/transaction/${props.id}`)
    }
    return (
        <div className="bg-dark d-flex justify-content-between pt-1">
            <div className="float-start">
                <h4 className="text-white ">{props.id}. {props.action === "BUY" ? "Bought" : "Sold"} {props.amount} {props.crypto} at price of {props.price}$</h4>
            </div>
            <div className="float-end">
                <Button startIcon={<EditIcon />} size="small" color="primary" variant="contained" onClick={() => editTransaction()}>
                    Edit Transaction
                </Button>
            </div>
        </div>
    )
}

export default TransactionView