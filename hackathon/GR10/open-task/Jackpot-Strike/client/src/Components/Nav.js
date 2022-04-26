import {AppBar,Toolbar,Grid, Button,makeStyles} from "@material-ui/core";
import Image from "./Image";

const Nav = ({login,chainId,addr}) => {
    const AdaptAddress = (addr)=>{return addr !== null ? addr.substr(0,6)+"...."+addr.substr(38,4) : "Loading"}
    const styled = makeStyles({
        root:{
            border: "0",
            borderRadius: "15",
            boxShadow: "0 3px 5px 2px rgba(0, 128, 255, .3)",
            color: "white",
            height: 42,
            fontWeight:"bold",
            padding: "0 30px",
        },
        btn:{
            background: "linear-gradient(45deg, #DC143C 30%, #FF6347 90%)",
            border: "0",
            borderRadius: "50px 0px 0px 50px",
            boxShadow: "0 3px 5px 2px rgba(255, 99, 71, .3)",
            minWidth:42,
            padding:0,
            margin:0,
            fontWeight:"bold",
        },
        bar:{
            background:"#E4FBFF"
        }
    });
    const CustomBtn = ({content})=>{
        return (
            <Button className={styled().root}
                    style={{background:"linear-gradient(45deg, #198cff 30%, #99ccff 90%)"}}
                    variant="outlined"
                    onClick={()=>{login()}}>
                            {content}
            </Button>
        )
    }
    const Connect = ()=>{
        return (<CustomBtn content={addr===null? "Connect" : AdaptAddress(addr)} />)
    }
    const WrongChain =()=>{
        return (<Button className={styled().root} style={{backgroundColor:"red"}} variant="outlined" onClick={()=>{login()}}> Wrong Chain!</Button>)
    }
    const InstallMetamask = ()=>{
        return (
            <Button 
                className={styled().root}
                style={{backgroundColor:"orange"}}
                variant="outlined" 
                onClick={()=>{window.open("https://metamask.io/download.html","_blank");}}
                >Install Metamask!
            </Button>
        )
    }
    const Btn = ()=>(
        <Grid container justify="flex-end">
                {window.ethereum ? 
                    <>
                        {console.log("id",chainId,"address",addr)}
                        {chainId !== null 
                        ? <>
                            {addr !== null 
                            ? <> {chainId 
                                ? <Connect/> 
                                : <WrongChain/>} </> 
                            : <Connect/>}
                        </>
                        : <CustomBtn content="Loading ..."/>
                        }
                    </>
                : <InstallMetamask/>
                } 
        </Grid>
    );

    return (
            <AppBar className={styled().bar}  position='static' color="default">
                <Toolbar >
                    <Image url={"./img/logo-trans.png"}/>
                    <Btn/>
                </Toolbar>
            </AppBar>
    )   
}

export default Nav
