import React, { useState, useEffect } from 'react';
import { DisplayCurrentTemperature } from './DisplayCurrentTemperature';
import { TemperatureForm } from './TemperatureForm';

export const CurrentTemperature = () => {
  const [coords, setCoords] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formCoordinates, setFormCoordinates] = useState(null);

  const [formState, setFormState] = useState({
    latitude: '',
    longitude: '',
  });

  const handleFormChange = (field, value) => {
    setFormState((formState) => ({
      ...formState,
      [field]: value,
    }));
  };

  const handleAddCoordinates = (newCoordinates) => {
    setFormCoordinates({
      latitude: parseFloat(newCoordinates.latitude),
      longitude: parseFloat(newCoordinates.longitude),
    });
  };

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      setCoords(pos.coords);
      setFormCoordinates(null); // Reset form coordinates when geolocation is successful
    }

    function error(err) {
      setErrorMessage(
        `${err.message} - write your geo position to check the weather`,
      );
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCoordinates = {
      ...formState,
    };

    handleAddCoordinates(newCoordinates);
  };

  const activeCoordinates = formCoordinates || coords;

  return (
    <div>
      <h2>Current temperature:</h2>
      {coords ? (
        <p>
          Latitude: {coords.latitude}, Longitude: {coords.longitude}
        </p>
      ) : (
        <div>
          <p>{errorMessage}</p>
          <TemperatureForm
            formState={formState}
            onFormChange={handleFormChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
      <DisplayCurrentTemperature coords={activeCoordinates} />
    </div>
  );
};
