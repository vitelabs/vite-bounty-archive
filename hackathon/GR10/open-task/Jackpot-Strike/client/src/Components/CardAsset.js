import { makeStyles, List, ListItem, Button } from '@material-ui/core'
import React from 'react'
import AvatarImg from './AvatarImg';
import { useEffect, useState } from 'react';
import Text from "./Text";
import { fetchPrice, fetchRounds, fetchBoundries, fetchStatus, latestCycle, statusAdapt } from '../Web3';

const CardAsset = ({ switchDetail, Name, Id, Img, Status, chainId }) => {
    let [price, setPrice] = useState(0);
    let [round, setRound] = useState(0);
    let [status, setStatus] = useState("...");
    let [cycle, setCycle] = useState(0);
    const [boundaries, setBoundries] = useState({ H: 0, L: 0 })

    let adaptPrice = (num) => {
        let main = num;
        if (num < 1) { main = num.toFixed(4) }
        else if (num < 10) { main = num.toFixed(3) }
        else { main = num.toFixed(2) }
        return main;
    }
    useEffect(() => {
        let unmount = false;
        let interval = setInterval(() => {
                async function fetch() {
                    if (window.ethereum && chainId && !unmount) {
                        console.log("run")
                        let _cycle = await latestCycle(Id);
                        let _price = await fetchPrice(Id);
                        let _round = await fetchRounds(Id);
                        let _status = await fetchStatus(Id);
                        let _boundaries = await fetchBoundries(Id);
                        if (_price !== undefined && _price !== price) setPrice(_price);
                        if (_round !== undefined && _round !== round) setRound(_round);
                        if (_status !== undefined && _status !== status) setStatus(_status);
                        if (_cycle !== undefined && _cycle !== cycle) setCycle(_cycle);
                        if (_boundaries !== undefined && _boundaries[0] !== boundaries.H && _boundaries[1] !== boundaries.L) setBoundries({ H: _boundaries[0], L: _boundaries[1] });
                    }
                }
                fetch();
        }, 1500);
        return () => { unmount = true; clearInterval(interval); }
    });
    const styled = makeStyles({
        root: {
            boxShadow: "0.2px solid lightgray",
            display: "flex",
            margin: "auto",
        },
        btn: {
            color: "white",
            borderRadius: "15px",
            fontSize: "0.75em",
            minWidth: "16ch",
            fontWeight: "bold",
        }
    });
    const Actionable = () => {
        return (
            <List>
                <ListItem >
                    <Button className={styled().btn} style={{ backgroundColor: "red" }} onClick={() => { switchDetail(1, Id) }}>bid</Button>
                </ListItem>
                <ListItem>
                    <Button className={styled().btn} style={{ backgroundColor: "green" }} onClick={() => { switchDetail(2, Id) }}>withdraw</Button>
                </ListItem>
            </List>
        )
    }
    return (
        <ListItem className={styled().root} style={Status ? {} : { borderBottom: "0.5px solid" }}>
            <AvatarImg Size={12} Src={Img} />
            <Text value="" upper="Pair" content={Name} width="8ch" />
            <Text value={price} upper="Price" content={"$" + adaptPrice(price)} width="8ch" />
            <Text value={boundaries.H} upper="H/L Target" content={"$" + adaptPrice(boundaries.H / 10 ** 18) + "/$" + adaptPrice(boundaries.L / 10 ** 18)} width="20ch" />
            <Text value={round} upper="Round" content={round + "/50"} width="8ch" />
            <Text value={cycle} upper="Cycle" content={cycle} width="8ch" />
            <Text value={statusAdapt(status)} upper="Status" content={statusAdapt(status)} width="8ch" />
            <Text value="" content={(<Actionable />)} width="10ch" />
        </ListItem>
    )
}
export default CardAsset
