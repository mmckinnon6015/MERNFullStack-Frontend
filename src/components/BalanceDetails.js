
const BalanceDetails = ({ balance }) => {
    return (
        <div className="balance-details">
            <h4>{balance.title}</h4>
            <p><strong>Amount: $</strong>{balance.amount}</p>
            <p>{balance.createdAt}</p>
        </div>
    )
}

export default BalanceDetails