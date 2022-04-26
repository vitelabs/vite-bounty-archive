import { makeStyles } from '@material-ui/core'
import React from 'react'

const Image = ({url}) => {
    const styled = makeStyles({
        logo:{
            width:200,
            height:"auto",
            padding: "12px 0",
        }
    })
    return (
        <div>
            <img className={styled().logo} src={url} alt="Jackpot Strike" height="40px"/>
        </div>
    )
}

export default Image
