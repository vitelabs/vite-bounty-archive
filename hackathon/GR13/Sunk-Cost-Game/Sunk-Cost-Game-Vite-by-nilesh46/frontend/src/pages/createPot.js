import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SignIn from "../components/signin";
import { useSelector, useDispatch } from "react-redux";
import Info from "../components/Info";
import { ContractCall, CreatePot } from "../redux/actions/action";
import { useNavigate } from "react-router-dom";

const ReatePot = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const fee = useSelector((state) => state.pots.creationFee);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        setError("");
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const initialTimer = data.get("initialTimer");
        const maxTimer = data.get("maxTimer");
        const buyInIncrementAmount = data.get("buyInIncrementAmount");
        const burnAmount = data.get("burnAmount");
        const timeExtension = data.get("timeExtension");
        const tokenid = data.get("tokenid");

        try {
            await CreatePot(user, 10, [
                initialTimer,
                maxTimer,
                buyInIncrementAmount,
                burnAmount,
                timeExtension,
                tokenid,
            ]);
            // await ContractCall(
            //     user,
            //     "createPot",
            //     [
            //         initialTimer,
            //         maxTimer,
            //         buyInIncrementAmount,
            //         burnAmount,
            //         timeExtension,
            //         tokenid,
            //     ],
            //     10,
            //     "tti_5649544520544f4b454e6e40"
            // );
            navigate("/pots");
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <Container component="main" maxWidth="md" sx={{ textAlign: "center" }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <ShoppingBagIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    CREATE YOUR OWN POT
                </Typography>
                <SignIn />
                {user.address ? (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="initialTimer"
                            label="Initial Timer (Enter in sec)"
                            name="initialTimer"
                            autoFocus
                            placeholder="Initial Timer for which a Pot remains valid"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="maxTimer"
                            label="Max Timer Limit (Enter in sec)"
                            name="maxTimer"
                            autoFocus
                            placeholder="Max Time limit upto which end time be extended when players buy in"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="buyInIncrementAmount"
                            label="Buy In Increment Amount (in Smallest Unit of Token)"
                            name="buyInIncrementAmount"
                            autoFocus
                            placeholder="Amount by which Pot Price is increased at each buy in"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="burnAmount"
                            label="Burn Amount (in Smallest Unit of Token)"
                            name="burnAmount"
                            autoFocus
                            placeholder="Enter Amount to be burned at each buy in"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="timeExtension"
                            label="Time Extension (in sec)"
                            name="timeExtension"
                            autoFocus
                            placeholder="Time by which end time is increased at each buy in"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="tokenid"
                            label="Token ID"
                            defaultValue="tti_5649544520544f4b454e6e40"
                            name="tokenid"
                            autoFocus
                            placeholder="Token ID of token in which the pot should be purchased by each player"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create Pot
                        </Button>
                        <h3 style={{ color: "red" }}>{error}</h3>
                        <Info />
                    </Box>
                ) : null}
            </Box>
        </Container>
    );
};

export default ReatePot;
