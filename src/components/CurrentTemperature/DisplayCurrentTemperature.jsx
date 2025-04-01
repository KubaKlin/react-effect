import React, { useEffect, useState } from 'react';

export const DisplayCurrentTemperature = ({ coords }) => {
  const [temperatures, setTemperatures] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords?.latitude || !coords?.longitude) {
      return;
    }

    const searchParams = new URLSearchParams({
      latitude: coords.latitude,
      longitude: coords.longitude,
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
        setTemperatures(
          data.hourly.apparent_temperature.map((value) => ({
            id: Date.now() + Math.random(),
            temperature: value,
          })),
        );
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTemperatures(null);
      });
  }, [coords?.latitude, coords?.longitude]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!temperatures) {
    return <p>Loading hourly temperature forecast...</p>;
  }

  return (
    <div>
      Hourly temperature forecast:{' '}
      {temperatures.map(({ temperature, id }, index) => (
        <p key={id}>
          {index}:00 - {temperature}°C
        </p>
      ))}
    </div>
  );
};
