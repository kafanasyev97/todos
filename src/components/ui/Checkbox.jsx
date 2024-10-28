const Checkbox = ({ id, isCompleted, handleClick }) => {
  return (
    <input
      checked={isCompleted}
      onClick={(e) => handleClick(e, id)}
      type="checkbox"
    />
  )
}

export default Checkbox
