import React, { useEffect, useState } from "react";
import { getTournaments, joinTournament } from "../../api/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function AllTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [activeTournament, setActiveTournament] = useState(null);
  const [userId, setUserId] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedTournaments, setSelectedTournaments] = useState([]);
  const token = useSelector((state) => state.token);
  const [tournamentStateId, setTournamentStateId] = useState([]);
  const [countdown, setCountdown] = useState("");

  const fetchUserTournaments = async () => {
    try {
      const response = await getTournaments(token);
      setTournaments(
        response.data.tournamentDetail ? [response.data.tournamentDetail] : []
      );

      // console.log(tournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const calculateCountdown = () => {
    const now = new Date();
    const target = new Date(now);
    target.setHours(20, 0, 0, 0); // Set target time to 8 PM

    if (now > target) {
      target.setDate(target.getDate() + 1); // If it's past 8 PM, set target to 8 PM next day
    }

    const difference = target - now;
    const hours = Math.floor(difference / 1000 / 60 / 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setCountdown(`${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    fetchUserTournaments();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJoinClick = (tournamentId, tournamentStateId) => {
    setActiveTournament(tournamentId);
    setTournamentStateId(tournamentStateId);
  };

  const handleSubmit = (tournamentId) => {
    if (!userId) {
      alert("user Id cannot be empty!!");
      setActiveTournament("");
      return;
    }
    console.log("User ID:", userId);
    console.log("Tournament ID:", tournamentId);
    console.log(token);
    console.log(tournaments);
    setSelectedTournaments([...selectedTournaments, tournamentId]);
    setShowQRCode(true); // Show the QR code modal
  };

  const handlePaid = async (tournamentId) => {
    const res = await joinTournament(
      {
        pubgId: userId,
        tournamentId: tournamentId,
        tournamentStateId: tournamentStateId,
      },
      token
    );
    console.log(res);
    console.log("User ID:", userId);
    // console.log("Tournament ID:", swappedTournamentId);
    // console.log("Tournament State ID:", swappedTournamentStateId);
    alert("success");
    setShowQRCode(false); // Hide the QR code modal
    setUserId("");
    setActiveTournament(null); // Reset active tournament after submission
  };

  return (
    <>
      <section id="banner-section" className="inner-banner tournaments">
        <div className="ani-img">
          <img className="img-1" src="images/banner-circle-1.png" alt="icon" />
          <img className="img-2" src="images/banner-circle-2.png" alt="icon" />
          <img className="img-3" src="images/banner-circle-2.png" alt="icon" />
        </div>
        <div
          className="banner-content d-flex align-items-center"
          data-aos="fade-up"
          data-aos-offset="100"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="main-content">
                  <h1>Tournaments</h1>
                  <div className="breadcrumb-area">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb d-flex justify-content-center">
                        <li className="breadcrumb-item">
                          <Link to="/">Home</Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Tournaments
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="tournaments-section">
        <div className="overlay pt-120 pb-120">
          <div
            className="container wow fadeInUp"
            data-aos="fade-up"
            data-aos-offset="150"
          >
            {tournaments.map((tournament, index) => (
              <div key={index} className="single-item">
                <div className="row">
                  <div className="col-lg-3 col-md-3 d-flex align-items-center">
                    <img
                      className="top-img"
                      src="./images/game-img-1.png"
                      alt="image"
                    />
                  </div>
                  <div className="col-lg-6 col-md-9 d-flex align-items-center">
                    <div className="mid-area">
                      <h4>{tournament.name}</h4>
                      {/* <h4>Coming Soon...</h4> */}
                      <div className="title-bottom d-flex">
                        <div className="time-area bg">
                          <img src="images/waitng-icon.png" alt="image" />
                          <span>Starts in</span>
                          <span className="time">
                            &nbsp;
                            {countdown}
                            {/* soon.. */}
                          </span>
                        </div>
                        <div className="date-area bg">
                          <span>
                            {" "}
                            {format(parseISO(tournament.startTime), "MMMM dd")}
                            ,&nbsp;
                          </span>
                          <span className="date">8:00 P.M</span>
                        </div>
                      </div>
                      <div className="single-box d-flex">
                        {/* <div className="box-item">
                      <span className="head">ENTRY/PLAYER</span>
                      <span className="sub">{tournament.entry}</span>
                    </div> */}
                        <div className="box-item" style={{ padding: "5px" }}>
                          <span
                            className="head"
                            style={{ marginRight: "10px" }}
                          >
                            Total Participents
                          </span>
                          <span className="sub">
                            {tournament.totalparticipants}
                          </span>
                        </div>
                        {/* <div className="box-item">
                      <span className="head">Max Teams</span>
                      <span className="sub">{tournament.maxTeams}</span>
                    </div> */}
                        {/* <div className="box-item">
                      <span className="head">Participents : </span>
                      <span className="sub">{tournament.totalparticipants}</span>
                    </div> */}
                        {/* <div className="box-item">
                      <span className="head">skill Level</span>
                      <span className="sub">
                        {tournament.skillLevel}
                      </span>
                    </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex align-items-center">
                    <div className="prize-area text-center">
                      <div className="contain-area">
                        <span className="prize">
                          <img src="images/price-coin.png" alt="image" />
                          prize
                        </span>
                        <h4 className="dollar">₹ {tournament.firstPrize}</h4>
                        {token && (
                          <Link to={`/singletournament/${tournament.tournamentId}`} className="cmn-btn">
                          View Tournament
                        </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {showQRCode && (
        <div className="qr-code-modal">
          <div className="qr-code-content">
            <div className="qr-code">
              {/* Replace with your QR code image or component */}
              <img src="images/dummyqr.svg" alt="QR Code" />
            </div>
            <button
              className="cmn-btn"
              onClick={() => handlePaid(activeTournament)}
            >
              Paid
            </button>
          </div>
        </div>
      )}
    </>
  );
}
