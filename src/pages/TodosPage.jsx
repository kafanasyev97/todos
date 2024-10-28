import { Link } from 'react-router-dom'
import {
  useGetTodosQuery,
  useTodoComplitionToggleMutation,
} from '../redux/todosApi'
import Checkbox from '../components/ui/Checkbox'

const TodosPage = () => {
  const { data = [], isLoading } = useGetTodosQuery()
  const [changeComplitionTodo] = useTodoComplitionToggleMutation()

  if (isLoading) return <h1>Lox</h1>
  if (!data) return <h1>Список задач пуст</h1>

  const handleCheckboxClick = (event, id) => {
    changeComplitionTodo(id)
    event.stopPropagation()
  }

  return (
    <div className="main-div">
      <ul>
        {data.map((el) => (
          <li className="elem" key={el.id}>
            <Link to={`/todos/${el.id}`}>
              <Checkbox
                id={el.id}
                isCompleted={el.isCompleted}
                handleClick={handleCheckboxClick}
              />
              <div>{el.title}</div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/todos/new" className="main-link">
        Новая задача
      </Link>
    </div>
  )
}

export default TodosPage
