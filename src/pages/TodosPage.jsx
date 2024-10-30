import { useNavigate } from 'react-router-dom'
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useTodoComplitionToggleMutation,
} from '../redux/todosApi'
import Todo from '../components/Todo'
import Button from '../components/ui/Button'

const TodosPage = () => {
  const { data = [], isLoading } = useGetTodosQuery()
  const [changeComplitionTodo] = useTodoComplitionToggleMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const navigate = useNavigate()

  if (isLoading) return <h2 className="loading">Загрузка...</h2>

  const handleCheckboxClick = (event, id) => {
    changeComplitionTodo(id)
    event.stopPropagation()
  }

  const handleRemoveButtonClick = (event, id) => {
    deleteTodo(id)
    event.stopPropagation()
  }

  return (
    <div className={`page ${data.length === 0 ? 'empty-list' : ''}`}>
      {data.length === 0 ? (
        <h2>Список задач пуст</h2>
      ) : (
        <ul className="todo-list">
          {data.map((el) => (
            <Todo
              key={el.id}
              item={el}
              handleCheckboxClick={handleCheckboxClick}
              handleRemoveButtonClick={handleRemoveButtonClick}
            />
          ))}
        </ul>
      )}
      <Button
        handleClick={() => navigate('/todos/new')}
        classes="button"
        type="text"
      >
        Новая задача
      </Button>
    </div>
  )
}

export default TodosPage
