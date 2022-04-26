import React from 'react'
import Search from './Search'
import VuilderList from './VuilderList'
import NewsTable from './NewsTable'

const Explore = () => {
    return (
        <div id="explore" className="l-border">
            <Search />
            <VuilderList />
            <NewsTable />
        </div>
    )
}

export default Explore
