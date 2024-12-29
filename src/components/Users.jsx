import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

const Users = () => {
    const users = useSelector(state => state.root.users)

    return (
        <div className="container">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <ul style={{listStyleType: 'none', display: 'flex', gap: '10px'}}>
                <Nav.Link href="#" as="span">
                    <li><Link to="/">blogs</Link></li>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                    <li><Link to="/users">users</Link></li>
                </Nav.Link>
                </ul>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <h2>Users</h2>
            {users && [...users].map(user => (
                <p key={user.id}>
                    <Link to={`/${user.id}`} state={user.blogs}>
                        {user.username}
                    </Link> has {user.blogs.length} blogs created
                </p>
            ))}
        </div>
    )
}

export default Users
