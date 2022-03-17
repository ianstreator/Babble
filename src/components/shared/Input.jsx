function Input({ placeholder, className, onChange, value, maxLength, type, onKeyPress }) {
  return (
    <input
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      type={type}
      onKeyPress={onKeyPress}
    ></input>
  );
}

export default Input;
