import { forwardRef } from 'react'

const Input = forwardRef(({ value, onChange, placeholder }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
      type="text"
    />
  )
})

export default Input
