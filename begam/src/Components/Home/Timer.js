import React, { useEffect, useState } from 'react';

const Timer = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), 7,15); // Month is 0-indexed, so 6 is July
    const difference = targetDate - now;
    
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <h4>Coming Soon..In</h4>
      {timeLeft.days !== undefined && timeLeft.hours !== undefined ? (
        <span>{timeLeft.days} days and {timeLeft.hours} hours</span>
      ) : (
        <span>Time's up!</span>
      )}
    </>
  );
};

export default Timer;
