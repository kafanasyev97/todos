import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { ru } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'
import Input from '../components/ui/Input'
import { useCreateTodoMutation } from '../redux/todosApi'

registerLocale('ru', ru)

const NewTodoPage = () => {
  const [createTodo] = useCreateTodoMutation()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null)

  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: '',
      description: '',
      dueDate: null,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    createTodo(data)
    navigate('/todos')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="new-block">
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {/* <input className="new-input" type="text" /> */}
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              locale="ru"
              dateFormat="dd.MM.yyyy"
              placeholderText="Выберите дату"
              className="custom-date-input"
            />
          )}
        />
        {/* TODO */}
        <button className="main-link" type="submit">
          Сохранить задачу
        </button>
      </div>
    </form>
  )
}

export default NewTodoPage
