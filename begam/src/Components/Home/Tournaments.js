import React from "react";

const tournaments = [
  {
    tournamentname: "Mix It Mondays - Carry Only",
    image: "images/game-img-1.png",
    startsIn: "10d 2H 18M",
    date: "Apr 21, 5:00 AM EDT",
    entry: "10 Credits",
    teamSize: "2 VS 2",
    maxTeams: 64,
    enrolled: 11,
    skillLevel: "All",
    prize: 739,
  },
  {
    tournamentname: "Head 2 Head - Weekly - Nano",
    image: "images/game-img-2.png",
    startsIn: "10d 2H 18M",
    date: "Apr 21, 5:00 AM EDT",
    entry: "10 Credits",
    teamSize: "2 VS 2",
    maxTeams: 64,
    enrolled: 11,
    skillLevel: "All",
    prize: 854,
  },
  {
    tournamentname: "marathon aim premium",
    image: "images/game-img-3.png",
    startsIn: "10d 2H 18M",
    date: "Apr 21, 5:00 AM EDT",
    entry: "10 Credits",
    teamSize: "2 VS 2",
    maxTeams: 64,
    enrolled: 11,
    skillLevel: "All",
    prize: 105,
  },
  {
    tournamentname: "Begum Fortnite Tournament 23",
    image: "images/game-img-4.png",
    startsIn: "10d 2H 18M",
    date: "Apr 21, 5:00 AM EDT",
    entry: "10 Credits",
    teamSize: "2 VS 2",
    maxTeams: 64,
    enrolled: 11,
    skillLevel: "All",
    prize: 473,
  },
  {
    tournamentname: "60 Player - Weekly - Micro",
    image: "images/game-img-5.png",
    startsIn: "10d 2H 18M",
    date: "Apr 21, 5:00 AM EDT",
    entry: "10 Credits",
    teamSize: "2 VS 2",
    maxTeams: 64,
    enrolled: 11,
    skillLevel: "All",
    prize: 778,
  },
];

export default function Tournaments() {
  return (
    <section id="tournaments-section">
      <div className="overlay pt-120 pb-120">
        <div className="container wow fadeInUp">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="section-header">
                <h2 className="title">Browse Tournaments</h2>
                <p>
                  Find the perfect tournaments for you. Head to head matches
                  where you pick the game, rules and prize.
                </p>
              </div>
            </div>
          </div>

          {tournaments.map((tournament, index) => (
            <div key={index} className="single-item">
              <div className="row">
                <div className="col-lg-3 col-md-3 d-flex align-items-center">
                  <img className="top-img" src={tournament.image} alt="image" />
                </div>
                <div className="col-lg-6 col-md-9 d-flex align-items-center">
                  <div className="mid-area">
                    <h4>{tournament.tournamentname}</h4>
                    <div className="title-bottom d-flex">
                      <div className="time-area bg">
                        <img src="images/waitng-icon.png" alt="image" />
                        <span>Starts in</span>
                        <span className="time">{tournament.startsIn}</span>
                      </div>
                      <div className="date-area bg">
                        <span className="date">{tournament.date}</span>
                      </div>
                    </div>
                    <div className="single-box d-flex">
                      <div className="box-item">
                        <span className="head">ENTRY/PLAYER</span>
                        <span className="sub">{tournament.entry}</span>
                      </div>
                      <div className="box-item">
                        <span className="head">Team Size</span>
                        <span className="sub">{tournament.teamSize}</span>
                      </div>
                      <div className="box-item">
                        <span className="head">Max Teams</span>
                        <span className="sub">{tournament.maxTeams}</span>
                      </div>
                      <div className="box-item">
                        <span className="head">Enrolled</span>
                        <span className="sub">{tournament.enrolled}</span>
                      </div>
                      <div className="box-item">
                        <span className="head">skill Level</span>
                        <span className="sub">{tournament.skillLevel}</span>
                      </div>
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
                      <h4 className="dollar">${tournament.prize}</h4>
                      <a href="tournaments-single.html" className="cmn-btn">
                        View Tournament
                      </a>
                      <p>Top 3 Players Win a Cash Prize</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
