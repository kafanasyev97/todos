import { useNavigate } from 'react-router-dom'
import Checkbox from './ui/Checkbox'

const Todo = ({ item, handleCheckboxClick, handleRemoveButtonClick }) => {
  const navigate = useNavigate()

  return (
    <li
      onClick={() => navigate(`/todos/${item.id}`)}
      className="elem"
      key={item.id}
    >
      <div className="aa">
        <Checkbox
          id={item.id}
          isCompleted={item.isCompleted}
          handleClick={handleCheckboxClick}
        />
        <div>{item.title}</div>
      </div>
      <div className="aa">
        <div>{new Date(item.dueDate).toLocaleDateString()}</div>
        <button
          className="remove-button"
          onClick={(e) => handleRemoveButtonClick(e, item.id)}
        >
          Удалить
        </button>
      </div>
    </li>
  )
}

export default Todo
