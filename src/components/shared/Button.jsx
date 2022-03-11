function Button({ type, children, className, style, onClick }) {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Button;
