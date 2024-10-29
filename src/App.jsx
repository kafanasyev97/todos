import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import TodosPage from './pages/TodosPage'
import TodoFormPage from './pages/NewTodoPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />

        <Route path="/todos" element={<Header />}>
          <Route index element={<TodosPage />} />
          <Route path="new" element={<TodoFormPage />} />{' '}
          <Route path=":id" element={<TodoFormPage />} />{' '}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
