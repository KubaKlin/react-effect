import styles from './Form.module.css';

export const TemperatureInput = ({
  handleInputChange,
  value,
  placeholder,
  name,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.formLabel}>{`Coordinates ${name}`}</label>
      <input
        name={name}
        onChange={handleInputChange}
        value={value}
        placeholder={placeholder}
        className={styles.formInput}
        required={true}
      />
    </div>
  );
};
