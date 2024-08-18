import React, { useEffect, useState } from "react";
import { getTournaments, joinTournament } from "../../api/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format, subHours, subMinutes } from "date-fns";
import UserTournaments from "../Home/UserTournaments";

export default function AllTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const token = useSelector((state) => state.token);
  const [countdowns, setCountdowns] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchUserTournaments = async () => {
    try {
      const response = await getTournaments(token,currentDate);
      setTournaments(
        response.data.tournamentDetail
      );

      // console.log(tournaments);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
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
    fetchUserTournaments();
  }, []);

  useEffect(() => {
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [tournaments]);



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
                          <Link to="/home">Home</Link>
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
            {token && (
        <section id="tournaments-section">
            <div className="container wow fadeInUp">
              {tournaments
                .filter((tournament) => {
                  // Filter out tournaments that have already started
                  let startTime = new Date(tournament.startTime);
                  startTime = subMinutes(subHours(startTime, 5), 30);
                  return startTime > new Date();
                })
                .map((tournament, index) => (
                  <div key={index} className="single-item" style={{ marginBottom: "20px",marginTop: "20px" }}>
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
                          <div className="title-bottom d-flex">
                            <div className="time-area bg">
                              <img src="images/waitng-icon.png" alt="image" />
                              <span>Starts in</span>
                              <span className="time">
                                &nbsp;
                                {countdowns[tournament.tournamentId] || "Loading..."}
                              </span>
                            </div>
                            <div className="date-area bg">
                              <span>
                                {format(subMinutes(subHours(tournament.startTime, 5), 30), "MMM dd, yyyy")}
                                &nbsp;
                              </span>
                              <span className="date">
                                {format(subMinutes(subHours(tournament.startTime, 5), 30), "hh:mm a")}
                              </span>
                            </div>
                          </div>
                          <div className="single-box d-flex">
                            <div className="box-item" style={{ padding: "5px" }}>
                              <span className="head" style={{ marginRight: "10px" }}>
                                Registered:{" "}
                              </span>
                              <span className="sub">{tournament.totalparticipants}</span>
                            </div>
                            <div className="box-item" style={{ padding: "5px" }}>
                              <span className="head" style={{ marginRight: "10px" }}>
                                Available:{" "}
                              </span>
                              <span className="sub">
                                {tournament.size - tournament.totalparticipants}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 d-flex align-items-center">
                        <div className="prize-area text-center">
                          <div className="contain-area">
                            <span className="prize">
                              <img src="images/price-coin.png" alt="image" />
                              Prize
                            </span>
                            <h4 className="dollar">₹ {tournament.firstPrize}</h4>
                            <Link
                              to={`/singletournament/${tournament.tournamentId}`}
                              className="cmn-btn"
                            >
                              View Tournament
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </section>
      )}
    </>
  );
}
