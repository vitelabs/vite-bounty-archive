import React from 'react'
import { news_transactions } from '../database/transac';

const NewsResults = () => {
    return news_transactions.filter((item, index) => index < 6).map((market) => (
        <tr key={market._id} >
            <td className={`table-type td ${market.type === "buy" ? 'buy': 'sell'}`}>{market.type}</td>
            <td className='table-id'>{market._id}</td>
            <td className='table-price'>{market.price}</td>
            <td className='table-qty'>{market.quantity}</td>
            <td className='table-addy'>{market.address}</td>
        </tr>));
}

export default NewsResults
