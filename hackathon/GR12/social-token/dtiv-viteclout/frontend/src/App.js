import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Showcase from "./components/home/Showcase";
import VuilderProfile from "./components/vuilder/VuilderProfile"
import Explore from "./components/explorer/Explore";
import EditVuilder from "./components/vuilder/EditVuilder"
import Login from './components/auth/Login'
import FanProfile from './components/fan/FanProfile'
import FanEdit from "./components/fan/FanEdit";
import ViteConnect from "./components/auth/ViteConnect";
import AdminPanel from "./components/auth/AdminPanel";

require('dotenv').config()
const { ViteAPI, wallet, utils, abi, accountBlock, keystore } = require('@vite/vitejs');
const { WS_RPC } = require('@vite/vitejs-ws');

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <div className="route-wrap">
            <Routes>
              <Route exact path="/" element={<Showcase />} />
              <Route exact path="/admin" element={<AdminPanel />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/auth/viteconnect" element={<ViteConnect />} />
              <Route exact path="/vuilder/:id" element={<VuilderProfile />} />
              <Route exact path="/explore" element={<Explore />} />
              <Route exact path="/vuilder/:id/edit" element={<EditVuilder />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profile/:id" element={<FanProfile />} />
              <Route exact path="/profile/:id/edit" element={<FanEdit />} />
            </Routes>
          </div>
        <Footer />
      </div>
      
    </BrowserRouter>
    
  );
}

export default App;
