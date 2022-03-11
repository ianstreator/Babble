function Input({ placeholder, className, onChange, value, maxLength, type }) {
  return (
    <input
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      type={type}
    ></input>
  );
}

export default Input;
