const Button = ({ type, handleClick, children, classes }) => {
  return (
    <button onClick={handleClick} type={type} className={classes}>
      {children}
    </button>
  )
}

export default Button
