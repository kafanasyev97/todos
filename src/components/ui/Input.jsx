const Input = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="new-input"
      type="text"
    />
  )
}

export default Input
