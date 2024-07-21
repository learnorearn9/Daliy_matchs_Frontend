import { useEffect, useState } from 'react';

const useCounter = (end, duration) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = (duration / end) * 1000;
    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(counter);
      }
    }, incrementTime);
    return () => clearInterval(counter);
  }, [end, duration]);

  return count;
};

export default useCounter;
