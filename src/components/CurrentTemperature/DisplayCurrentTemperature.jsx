import React, { useEffect, useState } from 'react';

export const DisplayCurrentTemperature = ({ coordinates }) => {
  const [temperatures, setTemperatures] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coordinates?.latitude || !coordinates?.longitude) {
      return;
    }

    const searchParams = new URLSearchParams({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });

    fetch(
      `https://api.open-meteo.com/v1/forecast?${searchParams}&hourly=apparent_temperature&forecast_days=1`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch temperature data');
        }
        return response.json();
      })
      .then((data) => {
        const combinedData = data.hourly.time.map((time, index) => ({
          id: Date.now() + Math.random(),
          temperature: data.hourly.apparent_temperature[index],
          time: new Date(time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }));
        setTemperatures(combinedData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTemperatures(null);
      });
  }, [coordinates?.latitude, coordinates?.longitude]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!temperatures) {
    return <p>Loading hourly temperature forecast...</p>;
  }

  return (
    <div>
      Hourly temperature forecast:{' '}
      {temperatures.map(({ temperature, id, time }) => (
        <p key={id}>
          {time} - {temperature}°C
        </p>
      ))}
    </div>
  );
};
