import { useNavigate } from 'react-router-dom'
import Checkbox from './ui/Checkbox'
import Button from './ui/Button'

const Todo = ({ item, handleCheckboxClick, handleRemoveButtonClick }) => {
  const navigate = useNavigate()

  return (
    <li
      onClick={() => navigate(`/todos/${item.id}`)}
      className="todo-list__item"
    >
      <div className="todo-list__item-info">
        <Checkbox
          id={item.id}
          isCompleted={item.isCompleted}
          handleClick={handleCheckboxClick}
        />
        <div>{item.title}</div>
      </div>
      <div className="todo-list__item-info">
        <div>{new Date(item.dueDate).toLocaleDateString()}</div>
        <Button
          classes="button button_remove"
          handleClick={(e) => handleRemoveButtonClick(e, item.id)}
        >
          Удалить
        </Button>
      </div>
    </li>
  )
}

export default Todo
