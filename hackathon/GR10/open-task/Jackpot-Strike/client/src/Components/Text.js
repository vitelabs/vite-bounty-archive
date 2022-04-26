import React from 'react'
import { makeStyles} from '@material-ui/core'
import {List} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import SkeletonElement from './Skeleton/SkeletonElement';

const Text = ({content,width,upper,value}) => {
    const styled = makeStyles({
        text:{
            color:"black",
            textAlign:"center",
            fontSize:"1.32em",
            padding: "10px 10px",
            justifyContent:"center"
        }
    });
    const SkeletonText = ({content,value})=>(
        <>
            {(value !== undefined && value !== 0 && value !== "...")
            ? content
            : <SkeletonElement/>}
        </>
    )
    return (
        <div className={styled().text} style={{"minWidth":width}} >
            <List>
                <Typography variant="subtitle2">{upper}</Typography>
                <SkeletonText content={<Typography variant="h6">{content}</Typography>} value={value}/>
            </List>
            
        </div>
    )
}

export default Text
