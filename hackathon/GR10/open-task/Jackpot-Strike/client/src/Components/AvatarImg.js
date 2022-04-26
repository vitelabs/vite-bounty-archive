import React from 'react'
import { makeStyles,Avatar} from '@material-ui/core'

const AvatarImg = ({Src,Size}) => {
    const styled = makeStyles((theme)=>({
        img:{
            width:theme.spacing(Size),
            height:theme.spacing(Size),
            margin: "8px 12px",
            border: '0.2px solid lightgray'
        },
    }));
    return (
        <Avatar src={Src} className={styled().img}/>
    )
}

export default AvatarImg
