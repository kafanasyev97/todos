import { useState } from 'react'

const Checkbox = ({ id, isCompleted, handleClick }) => {
  const [isChecked, setIsChecked] = useState(isCompleted)
  const handleCheckboxClick = (e) => {
    handleClick(e, id)
    setIsChecked(!isChecked)
  }
  return (
    <input checked={isChecked} onClick={handleCheckboxClick} type="checkbox" />
  )
}

export default Checkbox
