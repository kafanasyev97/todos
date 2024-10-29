import { Link } from 'react-router-dom'
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useTodoComplitionToggleMutation,
} from '../redux/todosApi'
import Todo from '../components/Todo'

const TodosPage = () => {
  const { data = [], isLoading } = useGetTodosQuery()
  const [changeComplitionTodo] = useTodoComplitionToggleMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  if (isLoading) return <h1>Загрузка...</h1>
  if (data.length === 0) return <h1>Список задач пуст</h1> // TODO

  const handleCheckboxClick = (event, id) => {
    changeComplitionTodo(id)
    event.stopPropagation()
  }

  const handleRemoveButtonClick = (event, id) => {
    deleteTodo(id)
    event.stopPropagation()
  }

  return (
    <div className="main-div">
      <ul>
        {data.map((el) => (
          <Todo
            item={el}
            handleCheckboxClick={handleCheckboxClick}
            handleRemoveButtonClick={handleRemoveButtonClick}
          />
        ))}
      </ul>
      <Link to="/todos/new" className="main-link">
        Новая задача
      </Link>
    </div>
  )
}

export default TodosPage
