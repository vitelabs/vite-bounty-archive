import React, { createContext } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

export const userContext = createContext({});
const Context = (props) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const getUser = async () => {
            try{
                const res = await axios.get("/getuser", { withCredentials: true })
                if(res.data){
                    setUser(res.data)
                }
            }catch (err){
                console.log(err)
            }
        }
        getUser()
    }, [])
    
    return (
        <userContext.Provider value={user}>{props.children}</userContext.Provider>
    )
}

export default Context
