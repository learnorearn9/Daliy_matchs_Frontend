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
import "./css/animate.css"
import "./css/nice-select.css"
import "./css/xzoom.css"
import "./css/slick.css"
import VerifyEmail from "./Components/Authentication/VerifyEmail";
import Protected from "./routes/Protected";
import About from "./Components/About/About";
import Tournament from "./Components/Tournaments/Tournament";
import Profile from "./Components/Profile/Profile";
import RecoverPassword from "./Components/Authentication/RecoverPassword";
import CreateTournament from "./Components/Admin/CreateTournament";
import Contact from "./Components/Pages/Contact";
import InsertResult from "./Components/Admin/InsertResult";
import Error from "./Components/Pages/Error";
import InsertPlayerOfTheWeek from "./Components/Admin/InsertPlayerofTheWeek";
import SingleTournament from "./Components/Tournaments/SingleTournament";
import Admin from "./Components/Admin/Admin";
import Verify from "./Components/Authentication/Verify";
import Tournaments from "./Components/Admin/Tournaments";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/verify" element={<VerifyEmail />} />
          <Route exact path="/verify-email" element={<Verify/>} />
          <Route exact path="/recover" element={<RecoverPassword />} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/tournament" element={<Protected component={Tournament} />} />
          <Route exact path="/profile" element={<Protected component={Profile} />} />
          <Route exact path="/createtournament" element={<Protected component={CreateTournament} />} />
          <Route exact path="/insertresult" element={<Protected component={InsertResult} />} />
          <Route exact path="/playerofweek" element={<Protected component={InsertPlayerOfTheWeek} />} />
          <Route path="/singletournament/:id" element={<SingleTournament />} />
          <Route path="/updatetournament" element={<Protected component={Tournaments} />} />
          <Route exact path="/admin" element={<Admin/>} />
          <Route exact path="/error" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
