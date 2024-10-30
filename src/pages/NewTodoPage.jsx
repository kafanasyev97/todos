import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
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
import Button from '../components/ui/Button'
import 'react-datepicker/dist/react-datepicker.css'

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
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__fields">
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Поле обязательно' }}
          render={({ field }) => (
            <div className="form__field">
              <Input {...field} placeholder="Название задачи" />
              {errors.title && (
                <span className="error">{errors.title.message}</span>
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
            <div className="form__field">
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
      </div>
      <Button classes="button" type="submit">
        Сохранить задачу
      </Button>
    </form>
  )
}

export default TodoFormPage
