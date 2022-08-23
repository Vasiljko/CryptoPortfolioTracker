export function TransactionView(props){
    return (
        <div className="bg-dark">
            <h4 className="text-white">{props.id}. {props.action === "BUY" ? "Bought" : "Sold"} {props.amount} {props.crypto} at price of {props.price}$</h4>
            
        </div>
    )
}