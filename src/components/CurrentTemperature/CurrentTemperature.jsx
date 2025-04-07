import React, { useState, useEffect } from 'react';
import { DisplayCurrentTemperature } from './DisplayCurrentTemperature';
import { TemperatureForm } from './TemperatureForm';

export const CurrentTemperature = () => {
  const [coordinates, setCoordinates] = useState(null);
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

    function success(position) {
      setCoordinates(position.coordinates);
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

  const activeCoordinates = formCoordinates || coordinates;

  return (
    <div>
      <h2>Current temperature:</h2>
      {coordinates ? (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
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
      <DisplayCurrentTemperature coordinates={activeCoordinates} />
    </div>
  );
};
