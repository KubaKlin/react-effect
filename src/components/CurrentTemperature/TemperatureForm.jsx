import styles from './Form.module.css';
import { TemperatureInput } from './TemperatureInput';

export const TemperatureForm = ({
  onAddCoordinates,
  formState,
  onFormChange,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const newCoordinates = {
      ...formState,
    };

    onAddCoordinates(newCoordinates);
  };

  const handleLatitudeInputChange = (event) => {
    onFormChange('latitude', event.target.value);
  };

  const handleLongitudeInputChange = (event) => {
    onFormChange('longitude', event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <TemperatureInput
        name="Latitude"
        value={formState.latitude}
        placeholder="Type Latitude"
        handleInputChange={handleLatitudeInputChange}
      />
      <TemperatureInput
        name="Longitude"
        value={formState.longitude}
        placeholder="Type Longitude"
        handleInputChange={handleLongitudeInputChange}
      />

      <button type="submit" className={styles.formSubmit}>
        {'Submit'}
      </button>
    </form>
  );
};
