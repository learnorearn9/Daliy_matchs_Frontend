import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPlayerOfWeek } from '../../api/api';

export default function Topthree() {
  const [results, setResults] = useState([]);
  const authToken = useSelector((state) => state.token);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getPlayerOfWeek(authToken);
        // Ensure response data is an array
        if (Array.isArray(response.data.data)) {
          setResults(response.data.data);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tournament results:', error);
      }
    };

    if (authToken) {
      fetchResults();
    }
  }, [authToken]);

  return (
    <>
    {authToken && (
 <section id="players-week-section">
 <div className="overlay pt-120 pb-120" data-aos="fade-up" data-aos-offset="620" data-aos-delay="150">
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
       {results.map((player, index) => (
         <div className="col-lg-4 col-md-6" key={index}>
           <div className={`single-item text-center ${index === 1 ? 'mid-area' : ''}`}>
             {index === 1 && (
               <div className="top-level">
                 <img src="images/star.png" alt="star" />
               </div>
             )}
             <div className="img-area">
               <div className="img-wrapper">
                 <img src="images/player-1.png" alt={player.userName} />
               </div>
             </div>
             <a href={player.profileLink}><h5>{player.userName}</h5></a>
             <p className="date">
               <span className="text-sm earn">{player.rank}</span>
             </p>
             <p className="text-sm credit">
               <span className="text-sm"> {player.tournamentName}</span>
             </p>
           
           </div>
         </div>
       ))}
     </div>
   </div>
 </div>
</section>
    )}
   
    </>
  );
}
