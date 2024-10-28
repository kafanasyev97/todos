import { useNavigate } from 'react-router-dom'

const NewTodoPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <input type="text" />
      <input type="text" />
      <input type="date" />
    </div>
  )
}

export default NewTodoPage
