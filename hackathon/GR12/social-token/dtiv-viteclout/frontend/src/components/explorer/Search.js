import React from 'react'
import { useState, useEffect } from 'react';
import ExploreTable from './ExploreTable'
import axios from 'axios'

const Search = () => {
    const [selection, setSelection] = useState("Name");
    const [select, setSelect] = useState("");
    const [result, setResult] = useState(false);
    const [allVuilders, setAllVuilders ] = useState("")
    //GET USER DATA FROM VITECLOUT-SERVER
    useEffect(() => {
        const getVuilder = async () => {
            const res = await axios.get("/user/list");
            setAllVuilders(res.data)
        }
        getVuilder()
    }, [])

    return (
        <div id="search">
            <div className="top-header banner">Explore</div>
            <form action="" id="search-form" onSubmit={e => {
                e.preventDefault()
                const filtered = allVuilders.filter((e) => (
                    e.twitterId === select
                ))
                setResult(filtered);
            }}>
                <div className="form-wrapp">
                    <div className="sel-wrap">
                        <select name="search-select" id="explore-select" defaultValue="Name" className="explore-btn" onChange={(e) => setSelection(e.target.value)}>
                            <option value="Name">Name</option>
                            <option value="Address">Address</option>  
                        </select>
                        <input type="text" className="explore-btn" id="explore-input" onChange={(e) => setSelect(e.target.value)} placeholder={`Enter Vuilders ${selection}`}/>
                    </div>
                    <input type="submit" className="explore-btn main-btn" id="explore-sumbit" value="Search"/>
                </div>
            </form>
            <ExploreTable vuilder={result}/>
        </div>
    )
}

export default Search
