import { forwardRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale'

registerLocale('ru', ru)

const DatePickerCustom = forwardRef(({ onChange, value }, ref) => {
  return (
    <div ref={ref}>
      <DatePicker
        selected={value}
        onChange={onChange}
        locale="ru"
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите дату"
        className="custom-date-input"
        popperPlacement="bottom-start"
      />
    </div>
  )
})

DatePickerCustom.displayName = 'DatePickerCustom'

export default DatePickerCustom
