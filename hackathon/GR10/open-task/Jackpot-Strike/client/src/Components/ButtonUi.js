import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
const ButtonUi = ({Addr,loginAction}) => {
    const AdaptAddress = (addr)=>{return addr.substr(0,6)+"...."+addr.substr(38,4)}
    const styled = makeStyles({
        root:{
            background: "linear-gradient(45deg, #198cff 30%, #99ccff 90%)",
            border: "0",
            borderRadius: "15",
            boxShadow: "0 3px 5px 2px rgba(0, 128, 255, .3)",
            color: "white",
            height: 42,
            fontWeight:"bold",
            padding: "0 30px",
        }
    });
    function something(){

    }
    
    return (
        <>
            <Button className={styled().root} variant="outlined" onClick={()=>{Addr === "" ? loginAction() : something()}}>
                {Addr===""? "Connect" : AdaptAddress(Addr)}
            </Button>
        </>
    )
}

export default ButtonUi
