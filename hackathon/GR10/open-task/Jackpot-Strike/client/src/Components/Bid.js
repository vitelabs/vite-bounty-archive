import { React, useEffect, useState } from 'react';
import { List, makeStyles, ListItem, Grid, Button, TextField, InputAdornment } from '@material-ui/core';
import data from '../data';
import KeyboardBackspaceTwoToneIcon from '@material-ui/icons/KeyboardBackspaceTwoTone';
import AvatarImg from './AvatarImg';
import Typography from '@material-ui/core/Typography';
import { fetchStatus, statusAdapt, fetchIsLocked, instance } from '../Web3';
import { getBalance, getAllowance, instanceToken, PREDICTION_ADDRESS } from '../Token';
import Text from './Text';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Zoom from '@material-ui/core/Zoom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Bid = ({ Id, switchDetail, login, chainId, addr }) => {
    const [status, setStatus] = useState("...");
    const [error, setError] = useState(false);
    const [balance, setBalance] = useState(0);
    const [lock, setLock] = useState(false);
    const [inputValue, setInputValue] = useState(10);
    const [allowance, setAllowance] = useState(0);
    const [open, setOpen] = useState(false);
    const [stateSnackBar, setStateSnackBar] = useState({ msg: "empty state", type: "info" });

    const styled = makeStyles({
        header: {
            backgroundColor: "#CCF2F4",
            maxWidth: "400px",
            margin: "auto",
            borderRadius: 25,
        },
        backBtn: {
            backgroundColor: "#126E82",
            borderRadius: 25,
            margin: "0 15px"
        }, assetLogo: {
            justify: "flex-end",
        },
        text: {
            color: "black",
            textAlign: "center",
            fontSize: "1.32em",
            padding: "10px 10px",
            justifyContent: "center"
        },
        btn: {
            color: "white",
            borderRadius: "10px",
            fontSize: "0.9em",
            minWidth: "16ch",
            maxHeight: "5ch",
            fontWeight: "bold",
        },
        status: {
            background: "white",
            maxWidth: "80%",
            margin: "auto",
            borderRadius: 15
        },
        unlock: {
            border: "0",
            borderRadius: "10px",
            background: "linear-gradient(45deg, #198cff 30%, #99ccff 90%)",
            boxShadow: "0 3px 5px 2px rgba(0, 128, 255, .3)",
            color: "white",
            width: "100%",
            maxWidth: "240px",
            height: 42,
            fontWeight: "bold",
            padding: "0 30px",
        }, lock: {
            margin: "auto 0px",
            padding: "0px 5px"
        }
    });

    useEffect(() => {
        let unmount = false;
        let interval = setInterval(async () => {
            async function fetchBalance() {
                let _token = 0, _allowance = 0, _lock = false, _status = "";
                if (addr !== "" && addr !== null && chainId) {
                    _token = await getBalance(addr);
                    _allowance = await getAllowance(addr);
                    _lock = await fetchIsLocked(Id);
                    _status = await fetchStatus(Id);
                    if (_token !== undefined) setBalance(_token.toFixed(2));
                    if (_allowance !== undefined) setAllowance(_allowance.toFixed(2));
                    if (_lock !== undefined) setLock(_lock);
                    if (_status !== undefined) setStatus(_status);
                }
            }
            if (!unmount) {
                fetchBalance();
            }
        }, 1000)
        return () => { unmount = true; clearInterval(interval); }
    });
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClick = (msg, type) => {
        setStateSnackBar({ msg: msg, type: type });
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setStateSnackBar({ msg: "empty state", type: "info" });
    };

    const handleTextField = input => {
        const val = input.target.value;
        const isValid = val >= 10;
        if (isValid) setInputValue(val);
        setError(!isValid);
    }
    async function approve() {
        await instanceToken.methods.approve(PREDICTION_ADDRESS, (inputValue * 10 ** 18).toString()).send({ from: addr })
            .on("transactionHash", hash => {
                // info snackbar of tx hash link
                handleClick("Transaction has been issued.","info");
                console.log("tx hash:", hash);
            }).on("receipt", receipt => {
                if(receipt.status) handleClick("Transaction has been completed!","success");
            }).on("error", (err,receipt) => {
                if(receipt!==undefined) handleClick("Transaction has been reverted!","error");
            })
    }
    async function bid(position) {
        await instance.methods.bid(Id, (inputValue * 10 ** 18).toString(), position).send({ from: addr })
            .on("transactionHash", hash => {
                handleClick("Transaction has been issued.","info");
                console.log("tx hash", hash);
            }).on("receipt", receipt => {
                if(receipt.status) handleClick("Transaction has been completed!","success");
            }).on("error", (err,receipt) => {
                if(receipt!==undefined  ) handleClick("Transaction has been reverted!","error");
            })
    }
    const LongShort = () => {
        return (
            <>
                <Grid container justify="center">
                    <Button endIcon={<AvatarImg Size={3} Src={"./img/LONG.svg"} />}
                        disabled={!lock}
                        className={styled().btn}
                        style={{ backgroundColor: "green", boxShadow: "0 3px 5px 2px rgba(0, 152, 0, .3)", }}
                        onClick={() => { bid(true) }}>
                        long</Button>
                    <Snackbar open={open}  autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={stateSnackBar.type}>{stateSnackBar.msg}</Alert>
                    </Snackbar>
                </Grid>
                {!lock ? <Tooltip title="Price is within a locked range, which is a 2% near each target." TransitionComponent={Zoom} className={styled().lock}><InfoIcon /></Tooltip> : ""}
                <Grid container justify="center">
                    <Button endIcon={<AvatarImg Size={3} Src={"./img/SHORT.svg"} />}
                        disabled={!lock}
                        className={styled().btn}
                        style={{ backgroundColor: "red", boxShadow: "0 3px 5px 2px rgba(255, 0, 0, .3)", }}
                        onClick={() => { bid(false) }}>
                        short</Button>
                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={stateSnackBar.type}>{stateSnackBar.msg}</Alert>
                    </Snackbar>
                </Grid>
            </>
        )
    }
    const Approval = () => {
        return (
            <Grid container justify="center">
                {!lock ? <Tooltip title="Price is within a locked range, which is a 2% near each target." TransitionComponent={Zoom} className={styled().lock}><InfoIcon /></Tooltip> : ""}
                <Button disabled={!lock} className={styled().unlock} onClick={() => { approve(); }}> approve </Button>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={stateSnackBar.type}>
                        {stateSnackBar.msg}</Alert>
                </Snackbar>
            </Grid>
        )
    }
    const UnlockWallet = () => {
        return (
            <Grid container justify="center">
                <Button className={styled().unlock}
                    onClick={() => { login() }}>
                    unlock wallet</Button>
            </Grid>
        )
    }
    const StatusDisplay = () => {
        return (
            <Grid className={styled().status} container justify="center">
                    <Text upper="Status"
                        content={statusAdapt(status)}
                        width="auto"
                        value={statusAdapt(status)} />
            </Grid>
        )
    }
    const BackBtn = () => {
        return (
            <Grid container justify="flex-end">
                <Button className={styled().backBtn} onClick={() => { switchDetail(0) }}><KeyboardBackspaceTwoToneIcon style={{ color: "white" }} /></Button>
            </Grid>
        )
    }
    return (
        <List className={styled().header}>
            <ListItem >
                <AvatarImg container className={styled().assetLogo} Size={8} Src={data[Id].img} />
                <div className={styled().text}>{data[Id].asset}</div>
                <BackBtn />
            </ListItem>
            <ListItem>
                <Grid container justify="center" alignItems="center">
                    <List>
                        <TextField type="number"
                            inputProps={{ min: 10 }}
                            id="outlined-basic"
                            label="Amount"
                            size="medium"
                            variant="standard"
                            defaultValue="10"
                            disabled={addr === null || !lock}
                            error={error}
                            onChange={handleTextField}
                            helperText={error ? "minimum amount is 10$" : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment style={{ marginBottom: 5 }}>
                                        <AvatarImg Size={3} Src={"./img/VITE.svg"} />
                                    </InputAdornment>
                                ),
                            }} />
                        <Typography style={{ right: "5px" }}
                            variant="subtitle2">
                            Balance: {balance}</Typography>
                    </List>
                </Grid>
            </ListItem>
            <ListItem>
                <StatusDisplay />
            </ListItem>
            <ListItem >
                {addr !== null
                    ?
                    <>
                        {Number(allowance) >= Number(inputValue)
                            ?
                            <LongShort />
                            :
                            <Approval />
                        }

                    </>
                    :
                    <UnlockWallet />
                }

            </ListItem>
        </List>
    )
}

export default Bid
