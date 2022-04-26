import React, { useEffect, useState } from "react";
import {
    Container,
    useMediaQuery,
    Box,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { purple, teal } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { ContractCall } from "../redux/actions/action.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// background-color: ${(props) => props.theme.palette.background.light};
const CCard = styled(Box)`
    border: 3px solid;
    border-radius: 15px;
    background-color: ${(props) => props.theme.palette.background.light};
    border-color: ${(props) => props.theme.palette.borderColor};
    overflow: hidden;
`;

const CBox = styled(Box)`
    background-image: url("/assets/patternlight.png");
    background-size: auto;
    padding: 6px;
`;

const PButton = styled(Button)`
    color: #fff;
    margin: 10px;
    background-color: ${purple[500]};
    &:hover {
        background-color: ${purple[700]};
    }
`;

const GButton = styled(Button)`
    color: #fff;
    margin: 10px;
    background-Color: ${teal[800]};
    &:hover {
      background-color: ${teal[900]};
    },
`;

const CustBox = styled(Box)`
    display: inline-block;
    background-color: ${(props) => props.theme.palette.color};
    border-radius: 10px;
    padding: 3px 6px;
    margin: 4px;
`;

const CustSpan = styled(Box)`
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    color: ${(props) => props.theme.palette.background.default};
`;

const InlineBox = styled(Box)`
    display: inline-block;
`;

const EachPot = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();
    toast.configure();

    const potIndex = parseInt(location.pathname.substring(6));
    let potData = useSelector((state) => state.pots.pots[potIndex]);
    if (potData === undefined)
        potData = [
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            potIndex,
        ];
    useEffect(() => {
        if (potData === undefined) navigate("/pots");
        let end = new Date(0); // The 0 there is the key, which sets the date to the epoch
        end.setUTCSeconds(potData[10]);
        let now = new Date();
        let timeDiffInSec = (end.getTime() - now.getTime()) / 1000;
        if (timeDiffInSec < 0) timeDiffInSec = 0;

        const sec = parseInt(timeDiffInSec, 10); // convert value to number if it's string
        let hours = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
        let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        setTimeLeft(timeDiffInSec);
    }, [timeLeft]);

    const notifyError = (msg) => toast.error(msg);
    const notifyWarn = (msg) => toast.warn(msg);

    const claimReward = async () => {
        if (user.address === "") {
            notifyError("User not authenticated, Kindly login and try again.");
            return;
        }
        if (user.address != potData[5]) {
            notifyError("Unfortunately, You're not the winner of this Pot");
            return;
        }
        if (potData[11] === true) {
            notifyWarn("Reward already claimed");
            return;
        }
        await ContractCall(user, "claimReward", [potData[12]], 0, potData[8]);
    };

    const buyPot = async () => {
        if (user.address === "") {
            notifyError("User not authenticated, Kindly login and try again.");
            return;
        }
        if (potData[11] === true) {
            notifyError("Can't Buy, Pot already Expired!");
            return;
        }

        await ContractCall(
            user,
            "buyPot",
            [potData[12]],
            potData[7],
            potData[8]
        );
    };

    return (
        <div>
            <Container maxWidth="md">
                <CCard mt={4}>
                    <CBox>
                        <Typography variant="h3" m={2}>
                            FOMO Pot: #{potData[12]}
                        </Typography>
                        <Grid justifyContent="space-between">
                            <InlineBox m={2}>
                                <PButton
                                    variant="contained"
                                    onClick={() => buyPot()}
                                >
                                    Buy Pot
                                </PButton>
                                <GButton onClick={() => claimReward()}>
                                    Claim Reward
                                </GButton>
                            </InlineBox>
                            <InlineBox sx={{ float: "right" }} m={2}>
                                <Typography
                                    variant="h5"
                                    sx={{ display: "inline-block" }}
                                >
                                    Ends In{" "}
                                </Typography>
                                <InlineBox>
                                    <CustBox>
                                        <CustSpan>{hours}</CustSpan>
                                    </CustBox>
                                    <span style={{ fontSize: "25px" }}>:</span>
                                    <CustBox>
                                        <CustSpan>{minutes}</CustSpan>
                                    </CustBox>
                                    <span style={{ fontSize: "25px" }}>:</span>
                                    <CustBox>
                                        <CustSpan>{seconds}</CustSpan>
                                    </CustBox>
                                </InlineBox>
                            </InlineBox>
                        </Grid>
                    </CBox>
                    <Box p={4}>
                        <Typography variant="h6" m={1}>
                            Owner Address:{" "}
                            {isMobile ? (
                                <>
                                    {potData[0].substring(0, 16) + "..."}
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                potData[0]
                                            );
                                        }}
                                    >
                                        Copy
                                    </Button>
                                </>
                            ) : (
                                <>{potData[0]}</>
                            )}
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Current Winner:{" "}
                            {isMobile ? (
                                <>
                                    {potData[5].substring(0, 16) + "..."}
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                potData[5]
                                            );
                                        }}
                                    >
                                        Copy
                                    </Button>
                                </>
                            ) : (
                                <>{potData[5]}</>
                            )}
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Current Pot Amount: {potData[6]} (in smallest unit)
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Token ID: {potData[8]}
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Price: {potData[7]} (in smallest unit)
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Buy In Increment Amount: {potData[2]} (in smallest
                            unit)
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Extension Time: {potData[4]} (in sec)
                        </Typography>
                        <Typography variant="h6" m={1}>
                            Burn Amount: {potData[3]} (in smallest unit)
                        </Typography>
                    </Box>
                </CCard>
            </Container>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
            />
        </div>
    );
};

export default EachPot;
