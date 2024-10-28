import { Outlet, Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <header style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <nav>
          <Link to="/todos" style={{ marginRight: '15px' }}>
            Tasks
          </Link>
          <Link to="/todos/new">Add New Task</Link>
        </nav>
      </header>

      <main style={{ marginBottom: '120px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Header
