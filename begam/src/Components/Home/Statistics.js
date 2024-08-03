import React, { useEffect, useState } from 'react';
import useCounter from './Counter'; // Ensure the path is correct
import { getUserReview } from '../../api/api';

const Statistics = () => {
  const matchesPlayed = useCounter(1,10); // Count to 100100 in 3 seconds
  const winningsPaid = useCounter(1,10); // Example value, replace with actual
  const activeLadders = useCounter(1,10); // Example value, replace with actual
  const xpEarned = useCounter(1,10); // Example value, replace with actual

  const [review,setReview] = useState([]);

  const getReview = async () => {
    try {
      const response = await getUserReview();
      setReview(response.data.tournamentDetail ? [response.data.tournamentDetail] : []);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    }
  };

  useEffect(()=> {
    getReview();
  },[])


  return (
    <section id="counter-section">
      <div className="overlay pt-120 pb-120" data-aos="fade-up" data-aos-offset="520" data-aos-delay="100">
        <div className="container">
          <div className="row mp-none">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-item text-center">
                <div className="img-area">
                  <img src="images/counter-icon-1.png" alt="image" />
                </div>
                <h3>
                  <span className="counter">{matchesPlayed}</span>
                </h3>
                <p style={{textTransform: "uppercase"}}>Matches Played</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-item text-center">
                <div className="img-area">
                  <img src="images/counter-icon-2.png" alt="image" />
                </div>
                <h3>
                  <span className="counter">{winningsPaid}</span>
                </h3>
                <p style={{textTransform: "uppercase"}}>Winnings Paid</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-item text-center">
                <div className="img-area">
                  <img src="images/counter-icon-3.png" alt="image" />
                </div>
                <h3>
                  <span className="counter">{activeLadders}</span>
                </h3>
                <p style={{textTransform: "uppercase"}}>Active Ladders</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-item text-center">
                <div className="img-area">
                  <img src="images/counter-icon-4.png" alt="image" />
                </div>
                <h3>
                  <span className="counter">{xpEarned}</span>
                </h3>
                <p style={{textTransform: "uppercase"}}>XP Earned</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
