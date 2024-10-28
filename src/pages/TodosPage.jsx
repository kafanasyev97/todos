import { Link } from 'react-router-dom'
import { useGetTodosQuery } from '../redux/todosApi'

const TodosPage = () => {
  const { data = [], isLoading } = useGetTodosQuery()

  if (isLoading) return <h1>Lox</h1>
  if (!data) return <h1>Список задач пуст</h1>

  return (
    <div className="main-div">
      <ul>
        {data.map((el) => (
          <li className="elem" key={el.id}>
            <Link to={`/todos/${el.id}`}>
              <input onClick={(e) => e.stopPropagation()} type="checkbox" />
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
