import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import TodosPage from './pages/TodosPage'
import NewTodoPage from './pages/NewTodoPage'
import TodoInfoPage from './pages/TodoInfoPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />

        <Route path="/todos" element={<Header />}>
          <Route index element={<TodosPage />} />
          <Route path="new" element={<NewTodoPage />} />{' '}
          <Route path=":id" element={<TodoInfoPage />} />{' '}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
