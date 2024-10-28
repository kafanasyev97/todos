import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { ru } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'

registerLocale('ru', ru)

const NewTodoPage = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="new-block">
      <input className="new-input" type="text" />
      <input className="new-input" type="text" />
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        locale="ru"
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите дату"
        className="custom-date-input"
      />
    </div>
  )
}

export default NewTodoPage
