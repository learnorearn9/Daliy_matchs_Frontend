import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTournaments, joinTournament, participents } from "../../api/api";
import { format, subHours, subMinutes } from "date-fns";
import Notification from "../atoms/notification";

const SingleTournament = () => {
  const { id } = useParams();
  const [tournaments, setTournaments] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [participent, setParticipent] = useState([]);
  const token = useSelector((state) => state.token);
  const [total, setTotal] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [pubgId, setPubgId] = useState("");
  const [countdowns, setCountdowns] = useState({});
  const [showQRCode, setShowQRCode] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchUserTournaments = async () => {
    try {
      const currentDate = format(new Date(), 'yyyy-MM-dd');

    // Pass the current date as a parameter to getTournaments
    const response = await getTournaments(token, currentDate);

      setTournaments(
        response?.data?.tournamentDetail
      );
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const getConfirmedPartcipents = async () => {
    try {
      const response = await participents(token);
      const allParticipants = response?.data || [];
      console.log(allParticipants);
      // Filter participants by tournamentStateId first
      console.log(allParticipants[0].tournamentStateId._id);
      
      const filteredByTournament = allParticipants.filter(
        (participant) => participant.tournamentStateId._id === tournament?.tournamentStateId
      );
  
      // Set total count of participants for this tournamentStateId
      setTotal(filteredByTournament.length);
  console.log(filteredByTournament);
  
      // Further filter by payment status
      const confirmedParticipants = filteredByTournament.filter(
        (participant) => participant.paymentStatus === true
      );
  console.log(confirmedParticipants);
  
      // Set confirmed participants
      setParticipent(confirmedParticipants|| []);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };
  

  const calculateCountdown = () => {
    const now = new Date();
    const updatedCountdowns = {};

    tournaments.forEach((tournament) => {
      // Apply the same time adjustments consistently
      let startTime = new Date(tournament.startTime);
      startTime = subMinutes(subHours(startTime, 5), 30); // Subtract 5 hours and 30 minutes

      const difference = startTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / 1000 / 60 / 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        updatedCountdowns[tournament.tournamentId] = `${hours}h ${minutes}m ${seconds}s`;
      } else {
        updatedCountdowns[tournament.tournamentId] = "Started";
      }
    });

    setCountdowns(updatedCountdowns);
  };


  useEffect(() => {
    if (tournaments.length > 0) {
      const foundTournament = tournaments.find((t) => t.tournamentId === id);
      setTournament(foundTournament);
    }
  }, [tournaments, id]);

  useEffect(() => {
    if (tournament) {
      getConfirmedPartcipents();
      setIsLoading(false); // Data is ready to be displayed
    }
  }, [tournament]);

  useEffect(() => {
    fetchUserTournaments();
  }, []);

  useEffect(() => {
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [tournaments]);


  const handleJoinNowClick = () => {
    if (isJoining) {
      setShowQRCode(true);
    } else {
      setIsJoining(true);
    }
  };

  const handlePaid = async () => {
    if (!tournament) return;

    try {
      const response = await joinTournament(
        {
          pubgId,
          tournamentId: id,
          tournamentStateId: tournament.tournamentStateId, // Extracted from tournament object
        },
        token
      );
      console.log(response); // Log the response from the API
       setNotification({ message: "Successfully joined the tournament!", type: "success" }); // Show success notification
     setIsJoining(false);
     setPubgId("");
       setShowQRCode(false);  // Hide the QR code modal
        // Refresh the page
    window.location.reload();
    } catch (error) {
      console.log(error);
      
      console.error("Error joining tournament:", error);
      setNotification({ message:"Error Joining Tournament!!", type: "error" }); // Show error notification
      setIsJoining(false);
      setPubgId("");
      setShowQRCode(false);
    }
  };

  return (
    <>
      <div className="notification-container">
      <Notification type={notification.type} message={notification.message} /></div>
      <section id="banner-section" className="inner-banner tournaments">
        <div className="ani-img">
          <img
            className="img-1"
            src="/images/banner-circle-1.png"
            alt="icon"
          />
          <img className="img-2" src="/images/banner-circle-2.png" alt="icon" />
          <img className="img-3" src="/images/banner-circle-2.png" alt="icon" />
        </div>
        <div className="banner-content d-flex align-items-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="main-content">
                  <h1>Tournament</h1>
                  <div className="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb d-flex justify-content-center">
                        <li className="breadcrumb-item">
                          <a href="/home">Home</a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Tournament
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="headign-info">
            <div className="top-area">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-4 d-flex justify-content-center">
                  <img src="/images/character_01.png" alt="image" />
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 d-flex align-items-center justify-content-sm-center justify-content-center">
                  <div className="mid-area text-center">
                    <img src="/images/text-img.png" alt="image" />
                    <h5>Fortnite Weekly Nano</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-4 zindex">
                  <img src="/images/character_02.png" alt="image" />
                </div>
              </div>
            </div>
            <div className="bottom-area">
              <div className="bottom">
                <div className="row d-flex justify-content-between">
                  <div className="col-lg-8 col-md-8 justify-content-sm-center d-grid">
                    <h3>{tournament?.name || "Loading..."}</h3>
                    <div className="title-bottom d-flex">
                      <div className="time-area bg">
                        <img src="/images/waitng-icon.png" alt="image" />
                        <span>Starts in</span>
                        <span className="time">&nbsp; {countdowns[tournament?.tournamentId] || "Loading..."}</span>
                      </div>
                      <div className="date-area bg">
                        {tournament?.startTime ? (
                          <>
                            <span>
                                {format(subMinutes(subHours(tournament.startTime, 5), 30), "MMM dd, yyyy")}
                                &nbsp;
                              </span>
                              <span className="date">
                                {format(subMinutes(subHours(tournament.startTime, 5), 30), "hh:mm a")}
                              </span>
                          </>
                        ) : (
                          <span className="date">Loading...</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 text-center">
                    <h2 className="dollar">
                      ₹{tournament?.fees || "Loading..."}
                    </h2>
                    {isJoining && (
                      <input
                        type="text"
                        placeholder="Enter your ID"
                        value={pubgId}
                        onChange={(e) => setPubgId(e.target.value)}
                        className="jointournament"
                      />
                    )}
                    <button
                      onClick={handleJoinNowClick}
                      className="cmn-btn"
                      style={{ color: "white" }}
                    >
                      {isJoining ? "Submit" : "Join Now!"}
                    </button>
                  </div>
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist"></ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="tournaments-content">
        <div className="tab-content" id="myTabContent">
          <div
            id="participants"
            role="tabpanel"
            aria-labelledby="participants-tab"
          >
            <div className="participants">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="participants-area pb-120">
                      <h4>Confirmed</h4>
                      {participent.map((p, index) => (
                        <div className="participants-single" key={index}>
                          <div className="left-area d-flex align-items-center">
                            <img
                              src={`/images/participant-1.png`}
                              alt="images"
                            />
                            <div className="right-side">
                              <h6>{p.userId.name}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="sidebar">
            <div className="single-side">
              <h5>Participants</h5>
              <div className="participants">
                <ul>
                  <li>
                    <span>Registered</span>
                    <span>{total ? 1 : total}</span>
                  </li>
                  <li>
                    <span>Confirmed</span>
                    <span>{participent.length ? 1 : participent.length}</span>
                  </li>
                  <li>
                    <span>Available slots</span>
                    <span>{tournament?.size - total}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showQRCode && (
        <div className="qr-code-modal">
          <div className="qr-code-content">
            <div className="qr-code">
              <img src="/images/qrcode.jpg" alt="QR Code" />
            </div>
            <button className="cmn-btn" onClick={handlePaid}>
              Paid
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTournament;
