import { Link } from 'react-router-dom'
import { useGetTodosQuery } from '../redux/todosApi'

const TodosPage = () => {
  const { data = [], isLoading } = useGetTodosQuery()
  console.log('fffffffffffff')

  if (isLoading) return <h1>Lox</h1>
  if (!data) return <h1>Список задач пуст</h1>

  return (
    <div className="main-div">
      <ul>
        {data.map((el) => (
          <li className="elem" key={el.id}>
            <input type="checkbox" />
            <div>{el.title}</div>
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
