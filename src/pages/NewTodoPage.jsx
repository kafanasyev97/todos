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
import DatePickerCustom from '../components/ui/DatePickerCustom'

registerLocale('ru', ru)

const TodoFormPage = () => {
  const { id } = useParams()
  const {
    data: todo,
    isSuccess,
    isLoading,
  } = useGetTodoByIdQuery(id, { skip: !id })
  const [createTodo] = useCreateTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
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
      setValue('dueDate', new Date(todo.dueDate))
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
    <form className="main-div" onSubmit={handleSubmit(onSubmit)}>
      <div className="new-block">
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Поле обязательно' }}
          render={({ field }) => (
            <div className="error">
              <Input {...field} placeholder="Название задачи" />
              {errors.title && (
                <span style={{ color: 'red', fontSize: '0.9rem' }}>
                  {errors.title.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Описание задачи" />
          )}
        />
        <Controller
          name="dueDate"
          control={control}
          rules={{ required: 'Поле обязательно' }}
          render={({ field }) => (
            <div className="error">
              <DatePickerCustom
                {...field}
                onChange={(date) => field.onChange(date)}
              />
              {errors.dueDate && (
                <span style={{ color: 'red', fontSize: '0.9rem' }}>
                  {errors.dueDate.message}
                </span>
              )}
            </div>
          )}
        />
        {/* TODO */}
      </div>
      <button className="main-link" type="submit">
        Сохранить задачу
      </button>
    </form>
  )
}

export default TodoFormPage
