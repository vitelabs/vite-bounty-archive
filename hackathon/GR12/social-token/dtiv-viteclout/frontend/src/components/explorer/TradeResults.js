import React from 'react'
import { transactions } from '../database/transac';

const TradeResults = () => {
    return transactions.filter((item, index) => index < 6).map((market) => (
        <tr key={market._id} >
            <td className={`td ${market.type === "buy" ? 'buy': 'sell'}`}>{market.type}</td>
            <td>{market._id}</td>
            <td>{market.price}</td>
            <td>{market.quantity}</td>
            <td>{market.circ_supply}</td>
            <td>{market.vft_reserve}</td>
            <td>{market.vite_reserve}</td>
        </tr>));
}

export default TradeResults
