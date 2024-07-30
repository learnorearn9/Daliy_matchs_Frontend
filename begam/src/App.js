import React,{useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import "./css/bootstrap.min.css";
import "./css/slick.css";
import VerifyEmail from "./Components/Authentication/VerifyEmail";
import Preloader from "./Components/atoms/Preloader";
import Protected from "./routes/Protected";
import About from "./Components/About/About";
import Tournament from "./Components/Tournaments/Tournament";
import Profile from "./Components/Profile/Profile";
import RecoverPassword from "./Components/Authentication/RecoverPassword";
import CreateTournament from "./Components/Admin/CreateTournament";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/verify" element={<VerifyEmail />} />
          <Route exact path="/recover" element={<RecoverPassword />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/tournament" element={<Protected component={Tournament} />} />
          <Route exact path="/profile" element={<Protected component={Profile} />} />
          <Route exact path="/createtournament" element={<Protected component={CreateTournament} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
