import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlayerOfWeek, getTournaments } from '../../api/api';

const topPlayers = [
  {
    imgSrc: 'images/player-1.png',
    name: 'Barton Griggs',
    xp: '1970 XP Earned',
    dateRange: '04/05 - 04/12',
    credits: '+20 credits',
    profileLink: 'profile.html'
  },
  {
    imgSrc: 'images/player-2.png',
    name: 'Mervin Trask',
    xp: '1970 XP Earned',
    dateRange: '04/05 - 04/12',
    credits: '+20 credits',
    profileLink: 'profile.html'
  },
  {
    imgSrc: 'images/player-3.png',
    name: 'Adria Poulin',
    xp: '1970 XP Earned',
    dateRange: '04/05 - 04/12',
    credits: '+20 credits',
    profileLink: 'profile.html'
  }
];

export default function Topthree() {
  const token = useSelector((state) => state.token);
  const [players, setPlayers] = useState([]);

  const playerOfTheWeek = async () => {
    try {
      const response = await getPlayerOfWeek({token});
      setPlayers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  useEffect(()=> {
    playerOfTheWeek();
  },[])
  return (
    <section id="players-week-section">
      <div className="overlay pt-120 pb-120">
        <div className="container wow fadeInUp">
          <div className="row justify-content-center">
            <div className="col-lg-7 mb-30">
              <div className="section-header text-center">
                <h2 className="title">Players of the Week</h2>
                <p>We take a look at the best player of the week awarded on Monday for the previous Monday to Sunday</p>
              </div>
            </div>
          </div>
          <div className="row mp-none">
            {topPlayers.map((player, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className={`single-item text-center ${index === 1 ? 'mid-area' : ''}`}>
                  {index === 1 && (
                    <div className="top-level">
                      <img src="images/star.png" alt="star"/>
                    </div>
                  )}
                  <div className="img-area">
                    <div className="img-wrapper">
                      <img src={player.imgSrc} alt="player"/>
                    </div>
                  </div>
                  <a href={player.profileLink}><h5>{player.name}</h5></a>
                  <p className="date">
                    <span className="text-sm earn">{player.xp}</span>
                    <span className="text-sm">{player.dateRange}</span>
                  </p>
                  <p className="text-sm credit">
                    <span className="text-sm"><img src="images/credit-icon.png" alt="credit"/> {player.credits}</span>
                  </p>
                  <a href={player.profileLink} className="cmn-btn">View Profile</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
