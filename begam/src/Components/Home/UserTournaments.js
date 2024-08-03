import React, { useEffect, useState } from "react";
import { getTournaments } from "../../api/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function UserTournaments() {
  const [tournaments, setTournaments] = useState([]);
const token = useSelector((state) => state.token);
  const fetchUserTournaments = async () => {
    try {
      const response = await getTournaments(token);
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
        {token && (
    <section id="tournaments-section">
    <div className="overlay pt-120 pb-120" data-aos="fade-up" data-aos-offset="320" data-aos-delay="100">
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
                  {/* <h4>{tournament.name}</h4> */}
                  <h4>Coming Soon...</h4>
                  <div className="title-bottom d-flex">
                    <div className="time-area bg">
                      <img src="images/waitng-icon.png" alt="image" />
                      <span>Starts on</span>
                      <span className="time">
                        {/* {format(parseISO(tournament.startTime), 'MMMM dd, yyyy')} */}
                        soon..
                      </span>
                    </div>
                    <div className="date-area bg">
                      {/* <span className="date">8:00 P.M</span> */}
                      <span className="date">..</span>
                    </div>
                  </div>
                  <div className="single-box d-flex">
                    {/* <div className="box-item">
                      <span className="head">ENTRY/PLAYER</span>
                      <span className="sub">{tournament.entry}</span>
                    </div> */}
                     <div className="box-item" style={{padding:"5px"}}>
                      <span className="head" style={{marginRight:"10px"}}>Total Participents</span>
                      {/* <span className="sub">{tournament.totalparticipants}</span> */}
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
                    {/* <h4 className="dollar">₹ {tournament.firstPrize}</h4> */}
                   {token ? (
                    <>
                   <Link
                     to={'/tournament'}
                      className="cmn-btn"
                    >
                      View Tournament
                    </Link>
                    </>
                   ):(
                    <>
                    <Link
                     to={'/login'}
                      className="cmn-btn"
                    >
                      View Tournament
                    </Link>
                    </>
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
        )}
      
        </>
  );
}
