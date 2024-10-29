import { Outlet, Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <header className="header">
        <nav className="container header-nav">
          <Link to="/todos">Задачи</Link>
          <Link to="/todos/new">Добавить новую задачу</Link>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  )
}

export default Header
