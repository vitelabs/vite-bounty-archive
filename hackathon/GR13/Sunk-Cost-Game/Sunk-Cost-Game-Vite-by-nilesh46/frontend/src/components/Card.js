import React, { useState, useEffect } from "react";
import Card from "react-animated-3d-card";
import { Hashicon } from "@emeraldpay/hashicon-react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
const CardComp = (props) => {
    // console.log(props);
    var end = new Date(0); // The 0 there is the key, which sets the date to the epoch
    end.setUTCSeconds(props.pot[10]);
    const { height, width } = useWindowDimensions();

    return (
        <Link to={`/pots/${props.pot[12]}`}>
            <Card
                className="card"
                style={{
                    backgroundColor: "inherit",
                    width:
                        width < 500
                            ? width - 20 / 0
                            : width < 800
                            ? "50vw"
                            : "30vw",
                    height: "200px",
                    cursor: "pointer",
                    padding: "10px 30px",
                }}
                //   onClick={() => console.log('Card clicked')}
            >
                <div style={{ textAlign: "center" }}>
                    <Hashicon value={props.pot[12]} size={100} />
                    <Stack
                        mt={2}
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {end <= new Date() ? (
                            <React.Fragment>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Expired" color="error" />
                                    <Chip
                                        label={`Winner : ${
                                            props.pot[5].substr(0, 10) + "..."
                                        }`}
                                        color="primary"
                                    />
                                </Stack>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Active" color="success" />
                                    <Chip
                                        label={`Current Price : ${
                                            props.pot[7].substr(0, 5) + "..."
                                        }`}
                                        color="primary"
                                    />
                                </Stack>
                                {/* <Stack direction="row" spacing={1}>
        <Chip label={`Current Buyer : ${props.pot[5].substr(0,20) + "..."}`} color="primary" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label={`EndTime : ${end}`} color="primary" />
      </Stack> */}
                            </React.Fragment>
                        )}
                        {/* <Chip label={`Pot Amount : ${props.pot[6]}`} color="secondary" /> */}
                    </Stack>
                </div>
            </Card>
        </Link>
    );
};
export default CardComp;
