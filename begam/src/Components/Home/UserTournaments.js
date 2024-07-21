import React, { useEffect, useState } from "react";
import { getTournaments } from "../../api/api";
import { format, parseISO } from "date-fns"; // Import date-fns functions

export default function UserTournaments() {
  const [tournaments, setTournaments] = useState([]);

  const fetchUserTournaments = async () => {
    try {
      const response = await getTournaments();
      setTournaments(response.data.tournamentDetail ? [response.data.tournamentDetail] : []);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  useEffect(() => {
      fetchUserTournaments();
  },[]);

  return (
    <>
        <>
          <section id="tournaments-section">
            <div className="overlay pt-120 pb-120">
              <div className="container wow fadeInUp">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8 text-center">
                    <div className="section-header">
                      <h2 className="title">Browse Tournaments</h2>
                      <p>
                        Find the perfect tournaments for you. Head to head
                        matches where you pick the game, rules and prize.
                      </p>
                    </div>
                  </div>
                </div>

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
                          <div className="title-bottom d-flex">
                            <div className="time-area bg">
                              <img src="images/waitng-icon.png" alt="image" />
                              <span>Starts on</span>
                              <span className="time">
                                {format(parseISO(tournament.startTime), 'MMMM dd, yyyy')}
                              </span>
                            </div>
                            <div className="date-area bg">
                              <span className="date">{tournament.date}</span>
                            </div>
                          </div>
                          <div className="single-box d-flex">
                            {/* <div className="box-item">
                              <span className="head">ENTRY/PLAYER</span>
                              <span className="sub">{tournament.entry}</span>
                            </div> */}
                            {/* <div className="box-item">
                              <span className="head">Team Size</span>
                              <span className="sub">{tournament.teamSize}</span>
                            </div> */}
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
                            <h4 className="dollar">{tournament.firstPrize}</h4>
                            <a
                              href="tournaments-single.html"
                              className="cmn-btn"
                            >
                              View Tournament
                            </a>
                            {/* <p>Top 3 Players Win a Cash Prize</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
    </>
  );
}
