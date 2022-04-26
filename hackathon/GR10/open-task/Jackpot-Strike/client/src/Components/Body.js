import { Grid, List, makeStyles } from '@material-ui/core'
import React from 'react'
import data from '../data'
import CardAsset from "./CardAsset"
import { useState } from 'react';
import Bid from './Bid';
import Withdraw from './Withdraw';

const Body = ({ login, chainId, addr }) => {
    let [click, setClick] = useState(0);
    let [selected, setSelected] = useState(0);
    function switchDetail(select, Id) { setClick(select); setSelected(Id) };
    const styled = makeStyles({
        root: {
            display: "flex",
            padding: "auto",
            margin: "48px 0px",
        },
        header: {
            backgroundColor: "#CCF2F4",
            borderRadius: 25,
        },
        btn: {
            backgroundColor: "#126E82",
            borderRadius: 25,
            margin: "0 15px"
        }, assetLogo: {
            justify: "flex-end",
        }, upper: {
            padding: "0 0 0 105px",
        }
    })
    const Main = () => {
        return (
            <List className={styled().header}>
                {data.map((asset) => {
                    let status = data[data.length - 1] === asset
                    return (
                        <CardAsset chainId={chainId} switchDetail={switchDetail} key={asset.id} Status={status} Name={asset.asset} Id={asset.id} Img={asset.img} />)
                })}
            </List>
        )
    }
    const Display = () => {
        if (click === 0) {
            return <Main />
        } else if (click === 1) {
            return <Bid Id={selected} switchDetail={switchDetail} login={login} chainId={chainId} addr={addr} />
        } else {
            return <Withdraw Id={selected} switchDetail={switchDetail} login={login} chainId={chainId} addr={addr} />
        }
    }
    return (
        <div className={styled().root}>
            <Grid container justify="center">
                <Display />
            </Grid>
        </div>
    )
}
export default Body
