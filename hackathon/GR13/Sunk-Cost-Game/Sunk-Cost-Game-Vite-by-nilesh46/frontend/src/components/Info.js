import React from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";

const Info = () => {
    return (
        <Container style={{ textAlign: "center" }}>
            <h4>Info/Rules Regarding Pot Creation</h4>
            <ul style={{ textAlign: "left" }}>
                <li>
                    <h5>
                        A User needs to pay 10 (amount in Vite) to create a pot
                    </h5>
                </li>
                <li>
                    <h5>
                        Initial Timer - Amount of Time in Sec for which the Pot
                        remains active after its creation (Eg initial Timer =
                        360000 , Pot will remain active 100 hours
                    </h5>
                </li>
                <li>
                    <h5>
                        Max Timer - Max Amount of Time in Sec upto which end
                        Time of pot can be extended. (Eg max timer = 10000 , Ie
                        if the time remaining in Pot ending is {" < "} 1000 sec
                        then increase the pot ending time by Extension Time else
                        if time remaining in pot ending >= 1000 , no effect og
                        pot end time
                    </h5>
                </li>
                <li>
                    <h5>Max Timer should always be {" <= "} Initial Timer</h5>
                </li>
                <li>
                    <h5>
                        Increment Amount is the amount by which pot price
                        increases at each buy in by a player.
                    </h5>
                </li>
                <li>
                    <h5>
                        Burn Amount is the amount that is burned at each buy in
                        by a player
                    </h5>
                </li>
                <li>
                    <h5>Buren Amount {" < "} Increment Amount</h5>
                </li>
                <li>
                    <h5>
                        Time extension is the time in sec by which the end time
                        is extended at each buy in by a player. Note : End time
                        is not increased if End time of pot {" >= "} max Timer
                        specified by the pot creator
                    </h5>
                </li>
                <li>
                    <h5>
                        Token ID refers to the token which will be used to buy
                        in the pot
                    </h5>
                </li>
            </ul>
        </Container>
    );
};
export default Info;
