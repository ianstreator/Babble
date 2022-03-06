function Form({children, className, action }) {
  return <form className={className} action={action}>
        {children}
      </form>; 
}

export default Form;
