import { makeStyles, List, Grid, Button, ListItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import data from '../data'
import KeyboardBackspaceTwoToneIcon from '@material-ui/icons/KeyboardBackspaceTwoTone';
import AvatarImg from './AvatarImg';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { fetchParticipation, latestCycle, statusState, fetchStatusOfCycle, instance, fetchIsWithdrawn } from '../Web3';
import Text from './Text';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import Zoom from '@material-ui/core/Zoom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Withdraw = ({ Id, switchDetail, login, chainId, addr }) => {
    const [status, setStatus] = useState(0);
    const [cycle, setCycle] = useState(0);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [participation, setParticipation] = useState([]);
    const [open, setOpen] = useState(false);
    const [isWithdrawn,setIsWithdrawn] = useState(null)
    const [stateSnackBar, setStateSnackBar] = useState({ msg: "empty state", type: "info" });

    const styled = makeStyles((theme) => ({
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
            height: theme.spacing(5),
            fontWeight: "bold",
            padding: "0 30px",
        }, lock: {
            margin: "auto 0px",
            padding: "0px 5px"
        }, formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        }, selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }))
    useEffect(() => {
        let unmount = false;
            let interval = setInterval(async () => {
                let _participations = [], _status = 0 , _isWithdrawn = null;
                if (addr !== null && addr !== "" && chainId && !unmount) {
                    _participations = await fetchParticipation(Id, addr);
                    let _cycle = await latestCycle(Id);
                    if (selectedCycle !== null) {_status = await fetchStatusOfCycle(Id, selectedCycle); _isWithdrawn = await fetchIsWithdrawn(Id,selectedCycle,addr);}
                    if (_participations !== undefined && _participations.toString() !== participation.toString()) setParticipation(_participations);
                    if (_status !== status) setStatus(_status);
                    if (_cycle !== undefined && _cycle !== cycle) setCycle(_cycle);
                    if(_isWithdrawn !== undefined && _isWithdrawn !== isWithdrawn) setIsWithdrawn(_isWithdrawn);
                }
            }, 1000);
            return () => { unmount = true; clearInterval(interval); }
    })
    async function _withdraw() {
        await instance.methods.withdraw(Id, selectedCycle).send({ from: addr })
            .on("transactionHash", hash => {
                handleClick("Transaction has been issued.","info");
                console.log("tx hash", hash);
            }).on("receipt", receipt => {
                console.log("receipt", receipt);
                if(receipt.status) handleClick("Transaction has been completed!","success");
            }).on("error", (err,receipt) => {
                if(receipt!==undefined) handleClick("Transaction has been reverted!","error");
            })
    }
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedCycle(value !== "" ? value : null);
    };
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
    const BtnAction = () => {
        if (addr !== null) {
            return participation.length === 0 || selectedCycle === null
                ? <GridElement content={<Button disabled={true} className={styled().unlock}> Not participated! </Button>} />
                : <Btn />
        } else { return <UnlockWallet /> }
    }
    const Selector = () => {
        return (
            <GridElement content={
                <FormControl variant="filled" className={styled().formControl}>
                    <InputLabel htmlFor="filled-age-native-simple">Cycle</InputLabel>
                    <Select
                        native
                        //   value={state.age}
                        onChange={handleChange}
                        inputProps={{
                            name: 'Cycles',
                            id: 'filled-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" />
                        {participation.map(elem => {
                            return (<option key={elem} value={elem}>{elem}</option>)
                        })}
                    </Select>
                </FormControl>
            } />
        )
    }
    const BackBtn = () => {
        return (
            <Grid container justify="flex-end">
                <Button className={styled().backBtn} onClick={() => { switchDetail(0) }}><KeyboardBackspaceTwoToneIcon style={{ color: "white" }} /></Button>
            </Grid>
        )
    }
    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const GridElement = ({ content, styled }) => {
        return (
            <Grid container className={styled} justify="center">
                {content}
            </Grid>
        )
    }
    const StatusDisplay = () => {
        return (
            <Grid className={styled().status} container justify="center">
                <Text upper="Status"
                    content={statusState(status)}
                    width="auto"
                    value={statusState(status)} />
            </Grid>
        )
    }
    const Redeem = () => {
        return (
            <GridElement content={
                <>
                {isWithdrawn ? <Tooltip title="You have withdrawn your funds." TransitionComponent={Zoom} className={styled().lock}><InfoIcon /></Tooltip> : ""}
                <Button disabled={isWithdrawn!==null ? isWithdrawn : true} className={styled().unlock} onClick={() => { _withdraw() }}> Redeem </Button>
                <Snackbar open={open}  autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={stateSnackBar.type}>{stateSnackBar.msg}</Alert>
                </Snackbar>
                </>
            }
            />
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
    const Unavailable = () => {
        return (
            <Grid container justify="center">
                <Tooltip title="Withdraw is only available after the cycle is due." TransitionComponent={Zoom} className={styled().lock}><InfoIcon /></Tooltip>
                <Button disabled={true} className={styled().unlock}> Unavailable </Button>
            </Grid>
        )
    }
    const Btn = () => {
        if (selectedCycle === cycle) {
            return <Unavailable />
        } else {
            return <Redeem />
        }
    }
    return (
        <List className={styled().header}>
            <ListItem >
                <AvatarImg container className={styled().assetLogo} Size={8} Src={data[Id].img} />
                <div className={styled().text}>{data[Id].asset}</div>
                <BackBtn />
            </ListItem>
            <ListItem>
                <Selector/>
            </ListItem>
            <ListItem>
                <StatusDisplay />
            </ListItem>
            <ListItem>
                <BtnAction />
            </ListItem>
        </List>
    )
}

export default Withdraw
