import React, { useState, useEffect } from 'react';

export const GlobalTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div>
      <h2>Current Time:</h2>
      {time.toLocaleTimeString()}
    </div>
  );
};
