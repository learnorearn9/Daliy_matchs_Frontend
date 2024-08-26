import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTournaments, joinTournament, participents } from "../../api/api";
import { format, subHours, subMinutes } from "date-fns";
import Notification from "../atoms/notification";
import Preloader from "../atoms/Preloader";
import { Link } from "react-router-dom";
const SingleTournament = () => {
  const { id } = useParams();
  const [tournaments, setTournaments] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [participent, setParticipent] = useState([]);
  const token = useSelector((state) => state.token);
  const [total, setTotal] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [option, setOption] = useState("overview");
  const [isJoining, setIsJoining] = useState(false);
  const [pubgId, setPubgId] = useState("");
  const [countdowns, setCountdowns] = useState({});
  const [showQRCode, setShowQRCode] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  // const [isLoading, setIsLoading] = useState(true);
  const isLoading = !tournament;

  const fetchUserTournaments = async () => {
    try {
      const currentDate = format(new Date(), "yyyy-MM-dd");

      // Pass the current date as a parameter to getTournaments
      const response = await getTournaments(token, currentDate);

      setTournaments(response?.data?.tournamentDetail);
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
        (participant) =>
          participant.tournamentStateId._id === tournament?.tournamentStateId
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
      setParticipent(confirmedParticipants || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };
  const [loading, setLoading] = useState(false);

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
        updatedCountdowns[
          tournament.tournamentId
        ] = `${hours}h ${minutes}m ${seconds}s`;
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
      // setIsLoading(false); // Data is ready to be displayed
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
  // Check if the user is already joining
  if (isJoining) {
    // If PUBG ID is missing, show an error and exit
    if (!pubgId) {
      setNotification({
        message: "Error: ID is required!",
        type: "error",
      });
      return;
    }
    // If PUBG ID is provided, show the QR code
    setShowQRCode(true);
  } else {
    // Start the joining process
    setIsJoining(true);
  }
};


const handlePaid = async () => {
  if (!tournament) return;
  
  setLoading(true); // Start loader

  try {
    const response = await joinTournament(
      {
        pubgId,
        tournamentId: id,
        tournamentStateId: tournament.tournamentStateId, // Extracted from the tournament object
      },
      token
    );

    console.log(response); // Log the response from the API

    setShowQRCode(false); // Hide the QR code modal

    // Stop the loader and show the notification after a short delay
    setNotification({
      message: "Successfully joined the tournament!",
      type: "success",
    });
  } catch (error) {
    console.error("Error joining tournament:", error);

    setShowQRCode(false); // Hide the QR code modal

    // Stop the loader and show the notification after a short delay
    setNotification({
      message: "Error Joining Tournament!",
      type: "error",
    });
  } finally {
    setLoading(false); // Ensure the loader stops in both success and error cases
    setIsJoining(false);
    setPubgId(""); // Reset the PUBG ID
    // Refresh the page or perform any additional actions if necessary
  }
};

useEffect(() => {
  if (notification) {
    const timer = setTimeout(() => {
      setNotification({ message: "", type: "" }); // Clear notification after 3 seconds
    }, 3000); // Adjust the time (in milliseconds) as needed

    return () => clearTimeout(timer);
  }
}, [notification]);

  return (
    <>
          {isLoading ? (
            <Preloader /> // Show the Preloader when loading
          ) : (
            <>
      <Navbar />
      <div className="notification-container">
        <Notification type={notification.type} message={notification.message} />
      </div>

      <section id="banner-section" className="inner-banner tournaments">
        <div className="ani-img">
          <img className="img-1" src="/images/banner-circle-1.png" alt="icon" />
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
                          <Link to={'/'}>Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Tournament Details
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
                      <div
                        className="time-area bg"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "65px",
                        }}
                      >
                        <img src="/images/waitng-icon.png" alt="image" />
                        <span>Starts in</span>
                        <span className="time">
                          &nbsp;{" "}
                          {countdowns[tournament?.tournamentId] || "Loading..."}
                        </span>
                      </div>
                      <div
                        className="date-area bg"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "65px",
                        }}
                      >
                        {tournament?.startTime ? (
                          <>
                            <span>
                              {format(
                                subMinutes(
                                  subHours(tournament.startTime, 5),
                                  30
                                ),
                                "MMM dd, yyyy"
                              )}
                              &nbsp;
                            </span>
                            <span className="date">
                              {format(
                                subMinutes(
                                  subHours(tournament.startTime, 5),
                                  30
                                ),
                                "hh:mm a"
                              )}
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
                    <input
                      type="text"
                      placeholder="Enter your ID"
                      value={pubgId}
                      onChange={(e) => setPubgId(e.target.value)}
                      className="jointournament"
                      style={{ visibility: isJoining ? "visible" : "hidden" }}
                    />
                    <button
                      onClick={handleJoinNowClick}
                      className="cmn-btn"
                      style={{ color: "white" }}
                    >
                      {isJoining ? "Submit" : "Join Now!"}
                    </button>
                  </div>
                </div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        option === "overview" ? "active" : ""
                      }`}
                      id="overview-tab"
                      data-toggle="tab"
                      onClick={() => setOption("overview")}
                      role="tab"
                      aria-controls="overview"
                      aria-selected={option === "overview"}
                    >
                      Overview
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        option === "participants" ? "active" : ""
                      }`}
                      id="participants-tab"
                      data-toggle="tab"
                      onClick={() => setOption("participants")}
                      role="tab"
                      aria-controls="participants"
                      aria-selected={option === "participants"}
                    >
                      Participants
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        option === "prizes" ? "active" : ""
                      }`}
                      id="prizes-tab"
                      data-toggle="tab"
                      onClick={() => setOption("prizes")}
                      role="tab"
                      aria-controls="prizes"
                      aria-selected={option === "prizes"}
                    >
                      Prizes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="tournaments-content">
        <div class="tab-content" id="myTabContent">
          {option === "overview" ? (
            <div class="container pb-120">
              <div class="row justify-content-center">
                <div class="col-lg-7">
                  <h4 class="head-area">Format</h4>
                  <div class="row wrapper">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="single-area">
                        <img src="/images/format-icon-1.png" alt="image" />
                        <h6>Game</h6>
                        <p class="text-sm">{tournament?.name}</p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="single-area">
                        <img src="/images/format-icon-2.png" alt="image" />
                        <h6>Check-in period</h6>
                        <p class="text-sm">45 minutes before start</p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="single-area">
                        <img src="/images/format-icon-4.png" alt="image" />
                        <h6>Entry Fee</h6>
                        <p class="text-sm">₹ {tournament?.fees}</p>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <div class="single-area">
                        <img src="/images/format-icon-5.png" alt="image" />
                        <h6>Prize Pool</h6>
                        <p class="text-sm">₹ {tournament?.firstPrize}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="sidebar">
                    <div
                      className="single-side"
                      style={{ textAlign: "center" }}
                    >
                      <div>
                        <h5>Participants</h5>
                      </div>

                      <div className="participants">
                        <ul>
                          <li>
                            <span>Registered</span>
                            <span>{total ? total : 1}</span>
                          </li>
                          <li>
                            <span>Confirmed</span>
                            <span>
                              {participent.length ?  participent.length : 1}
                            </span>
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
              </div>
            </div>
          ) : option === "participants" ? (
            <div class="participants">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="participants-area pb-120">
                      <h4>Confirmed</h4>
                      {participent.map((participant, index) => (
                        <div className="participants-single" key={index}>
                          <div className="left-area d-flex align-items-center">
                            <img
                              src="/images/boy.png"
                              alt="Participant"
                            />
                            <div className="right-side">
                              <h6>{participant?.userId?.name}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : option === "prizes" ? (
            <div class="prizes pb-120">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="table-responsive" style={{overflowX:"auto"}}>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Placement</th>
                            <th scope="col">Current Prize</th>
                            <th scope="col">Potential Prize</th>
                            <th scope="col">Winner</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th class="first" scope="row">
                              1st
                            </th>
                            <td>₹ {tournament?.firstPrize}</td>
                            <td>₹ {tournament?.firstPrize}</td>
                            <td>
                              <i class="fas fa-users"></i>To be decided
                            </td>
                          </tr>
                          <tr>
                            <th class="second" scope="row">
                              2nd
                            </th>
                            <td>₹ {tournament?.secondPrize}</td>
                            <td>₹ {tournament?.secondPrize}</td>
                            <td>
                              <i class="fas fa-users"></i>To be decided
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
    )}
    </>
  );
};

export default SingleTournament;
