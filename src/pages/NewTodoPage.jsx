import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import { ru } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'
import Input from '../components/ui/Input'
import {
  useCreateTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from '../redux/todosApi'
import { useEffect } from 'react'

registerLocale('ru', ru)

const NewTodoPage = () => {
  const { id } = useParams()
  const {
    data: todo,
    isSuccess,
    isLoading,
  } = useGetTodoByIdQuery(id, { skip: !id })
  const [createTodo] = useCreateTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const navigate = useNavigate()

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      dueDate: null,
    },
  })

  useEffect(() => {
    if (isSuccess && todo) {
      setValue('title', todo.title)
      setValue('description', todo.description)
      setValue('dueDate', new Date(todo.dueDate)) // Преобразуем дату в объект Date
    }
  }, [isSuccess, todo, setValue])
  if (isLoading) return <h1>Dibil</h1>

  const onSubmit = (data) => {
    if (id) {
      updateTodo(id, data)
        .unwrap()
        .then(() => navigate('/todos'))
    } else {
      createTodo(data)
        .unwrap()
        .then(() => navigate('/todos'))
    }
    console.log(data)
    // navigate('/todos')
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
