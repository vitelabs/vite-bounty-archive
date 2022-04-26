import React from "react";
import QRCode from "qrcode.react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const SignIn = () => {
    const user = useSelector((state) => state.user);
    return (
        <Container
            sx={{
                textAlign: "center",
                padding: "70px 0 20px 0",
                wordWrap: "break-word",
            }}
        >
            {user.address ? (
                <React.Fragment>
                    <h3>Welcome</h3>
                    <h3>{user.address}</h3>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h3>
                        {user.uri && (
                            <QRCode
                                value={user.uri}
                                style={{ border: "10px solid #fff" }}
                            />
                        )}
                    </h3>
                    <h3>Please Scan This QR from your Vite Wallet to Login</h3>
                    <h5>
                        <b>Note : </b>Kindly switch to testnet on Vite App (
                        follow the instructions as given below ) for making
                        transactions
                    </h5>
                    <h5>
                        {
                            "Go to settings > Node Settings > VITE > Add Custom Node > https://buidl.vite.net/gvite"
                        }
                    </h5>
                </React.Fragment>
            )}
        </Container>
    );
};
export default SignIn;
