import React from 'react'
import NewsResults from './NewsResults'
const NewsTable = () => {
    return (
        <div className="table-container">
            <div className="results-header">News Flash</div>
            <table id="news-table">
                <tbody>
                    <tr className="etable-header">
                        <th className='table-type'>Type</th>
                        <th className='table-id'>ID</th>
                        <th className='table-price'>Price</th>
                        <th className='table-qty'>Quantity</th>
                        <th className='table-addy'>Address</th>
                    </tr>
                    <NewsResults/>
                </tbody>
            </table>
        </div>   
    )
}

export default NewsTable