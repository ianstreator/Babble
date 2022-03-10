function Input({ placeholder, className, onChange, value }) {
  return (
    <input
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      value={value}
    ></input>
  );
}

export default Input;
