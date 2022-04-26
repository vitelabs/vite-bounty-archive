import { Container } from "@mui/material";
import React, { useState } from "react";
import SignIn from "../components/signin";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Profile = () => {
    const pots = useSelector((state) => state.pots.pots);
    const user = useSelector((state) => state.user);
    const [bought, setBought] = useState(0);
    const [won, setWon] = useState(0);
    const [owned, setOwn] = useState(0);
    return (
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
            <SignIn />
            {user.address ? (
                <React.Fragment>
                    <Grid
                        container
                        spacing={2}
                        sx={{ padding: "40px 10px" }}
                        justifyContent="center"
                    >
                        <Grid item xs={12}>
                            <h2>Active Bought In Pots -</h2>
                        </Grid>
                        {pots.map((each) => {
                            return (
                                <React.Fragment key={each[12]}>
                                    {each[5] === user.address &&
                                    each[13] === "active" ? (
                                        <Grid item sm={6} md={2}>
                                            <Link to={`/pots/${each[12]}`}>
                                                <Button
                                                    color="secondary"
                                                    variant="outlined"
                                                >
                                                    Pot{` #${each[12]}`}
                                                </Button>
                                            </Link>
                                        </Grid>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        sx={{ padding: "40px 10px 10px 10px" }}
                        justifyContent="center"
                    >
                        <Grid item xs={12}>
                            <h2>Pots Won - </h2>
                        </Grid>
                        {pots.map((each) => {
                            return (
                                <React.Fragment key={each[12]}>
                                    {each[5] === user.address &&
                                    each[13] === "expired" ? (
                                        <Grid item sm={6} md={2}>
                                            <Link to={`/pots/${each[12]}`}>
                                                <Button
                                                    color="secondary"
                                                    variant="outlined"
                                                >
                                                    Pot{` #${each[12]}`}
                                                </Button>
                                            </Link>
                                        </Grid>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        sx={{ padding: "40px 10px 10px 10px" }}
                        justifyContent="center"
                    >
                        <Grid item xs={12}>
                            <h2>Pots Owned - </h2>
                        </Grid>
                        {pots.map((each) => {
                            return (
                                <React.Fragment key={each[12]}>
                                    {each[0] === user.address ? (
                                        <Grid item sm={6} md={2}>
                                            <Link to={`/pots/${each[12]}`}>
                                                <Button
                                                    color="secondary"
                                                    variant="outlined"
                                                >
                                                    Pot{` #${each[12]}`}
                                                </Button>
                                            </Link>
                                        </Grid>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </React.Fragment>
            ) : null}
        </Container>
    );
};
export default Profile;
