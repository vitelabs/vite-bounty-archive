import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Pots from "./pages/pots";
import CreatePot from "./pages/createPot";
import EachPot from "./pages/eachPot";
import Header from "./components/Header";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { light, dark } from "./config/themization";
import QRCode from "qrcode.react";
import { Initialize } from "./redux/actions/action.ts";
import { useSelector, useDispatch } from "react-redux";
import {
    ContractQuery,
    GetPotData,
    ContractCall,
} from "./redux/actions/action";

const useDarkMode = () => {
    const [theme, setTheme] = useState(dark);

    const toggleTheme = () => {
        const updatedTheme = theme === dark ? light : dark;
        setTheme(updatedTheme);
    };
    return [theme, toggleTheme];
};

const App = () => {
    const dispatch = useDispatch();
    useEffect(async () => {
        await dispatch(Initialize());
    }, []);

    useEffect(() => {
        setInterval(() => {
            dispatch(GetPotData());
        }, 5000);
    }, []);

    const user = useSelector((state) => state.user);
    const [theme, toggleTheme] = useDarkMode();
    const themeConfig = createTheme(theme);

    return (
        <ThemeProvider theme={themeConfig}>
            <Header toggleTheme={toggleTheme} />
            <CssBaseline />
            {/* <button onClick={async () => await ContractQuery("owner" , [])}></button>  */}
            {/* <button onClick={async () => await ContractCall(user , "setFee" , ["10000000000000000000"] ,0, "tti_5649544520544f4b454e6e40")}></button> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/pots" element={<Pots />} />
                <Route path="/createpot" element={<CreatePot />} />
                <Route path="/pots/:num" element={<EachPot />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
