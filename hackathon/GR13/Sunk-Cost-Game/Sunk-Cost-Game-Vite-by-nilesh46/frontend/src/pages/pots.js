import React, { useState } from "react";
import CardComp from "../components/Card";
import { Box, Grid, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
const Pots = () => {
    const pots = useSelector((state) => state.pots.pots);
    const [active, setActive] = useState(true);
    const [expired, setExpired] = useState(true);

    return (
        <Container maxWidth="xl">
            <Stack spacing={2} m={8} direction="row" justifyContent="center">
                <Button
                    color="success"
                    variant={active ? "contained" : "outlined"}
                    onClick={() => setActive(!active)}
                >
                    Active
                </Button>
                <Button
                    color="error"
                    variant={expired ? "contained" : "outlined"}
                    onClick={() => setExpired(!expired)}
                >
                    Expired
                </Button>
            </Stack>
            <Grid container justifyContent="center" alignItems="center">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={5}
                >
                    {pots.map((each) => {
                        var end = new Date(0); // The 0 there is the key, which sets the date to the epoch
                        end.setUTCSeconds(each[10]);
                        const status = end <= new Date() ? "expired" : "active";

                        return (
                            <React.Fragment>
                                {active === true && status === "active" ? (
                                    <Grid item lg={4} key={each[12]}>
                                        <CardComp pot={each} />
                                    </Grid>
                                ) : null}
                                {expired === true && status === "expired" ? (
                                    <Grid item lg={4} key={each[12]}>
                                        <CardComp pot={each} />
                                    </Grid>
                                ) : null}
                                {expired === false && active === false ? (
                                    <Grid item lg={4} key={each[12]}>
                                        <CardComp pot={each} />
                                    </Grid>
                                ) : null}
                            </React.Fragment>
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    );
};
export default Pots;
