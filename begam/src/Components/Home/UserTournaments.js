import React, { useEffect, useState } from "react";
import { getTournaments } from "../../api/api";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { format, subHours, subMinutes } from "date-fns";

export default function UserTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const token = useSelector((state) => state.token);
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the date being used
  const [showAll, setShowAll] = useState(false); // Toggle to show all tournaments
  const navigate = useNavigate();

  const fetchUserTournaments = async () => {
    try {
      const response = await getTournaments(token, currentDate); // Pass the current date to the API call
      setTournaments(response.data.tournamentDetail);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  const calculateCountdown = () => {
    const now = new Date();
    const updatedCountdowns = {};

    tournaments.forEach((tournament) => {
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
  }, [currentDate, token]);

  useEffect(() => {
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [tournaments]);

  useEffect(() => {
    // Filter tournaments based on adjusted start time
    const now = new Date();
    const updatedFilteredTournaments = tournaments.filter((tournament) => {
      let startTime = new Date(tournament.startTime);
      startTime = subMinutes(subHours(startTime, 5), 30);
      return startTime > now;
    });

    setFilteredTournaments(updatedFilteredTournaments);
  }, [tournaments]);

  const visibleTournaments = showAll ? filteredTournaments : filteredTournaments.slice(0, 3); // Show only 3 tournaments if showAll is false

  return (
    <>
      {token && (
        <section id="tournaments-section">
          <div
            className="overlay pt-120 pb-120"
            data-aos="fade-up"
            data-aos-offset="320"
            data-aos-delay="100"
          >
            <div className="container wow fadeInUp">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-8 text-center">
                  <div className="section-header">
                    <h2 className="title">Browse Tournaments</h2>
                    <p>
                      Find the perfect tournaments for you. Head to head matches
                      where you pick the game, rules, and prize.
                    </p>
                  </div>
                </div>
              </div>

              {visibleTournaments.map((tournament, index) => (
                <div
                  key={index}
                  className="single-item"
                  style={{ marginBottom: "20px" }}
                >
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
                              {countdowns[tournament.tournamentId] ||
                                "Loading..."}
                            </span>
                          </div>
                          <div className="date-area bg">
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
                          </div>
                        </div>
                        <div className="single-box d-flex">
                          <div
                            className="box-item"
                            style={{ padding: "5px" }}
                          >
                            <span
                              className="head"
                              style={{ marginRight: "10px" }}
                            >
                              Enrolled{" "}
                            </span>
                            <span className="sub">
                              {tournament.totalparticipants}
                            </span>
                          </div>
                          <div
                            className="box-item"
                            style={{ padding: "5px" }}
                          >
                            <span
                              className="head"
                              style={{ marginRight: "10px" }}
                            >
                              Available
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
                            Entry Fee
                          </span>
                          <h4 className="dollar">₹ {tournament.fees}</h4>
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

              {filteredTournaments.length > 3 && !showAll && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="cmn-btn"
                    style={{ color: "white" }}
                    onClick={() => navigate("/tournament")} // Redirect to the tournaments page
                  >
                    View More
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
