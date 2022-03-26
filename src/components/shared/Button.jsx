function Button({ type, children, className, style, onClick, value, id }) {
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      style={style}
      value={value}
      id={id}
    >
      {children}
    </button>
  );
}

export default Button;
