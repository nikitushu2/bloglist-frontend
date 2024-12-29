import { useLocation } from "react-router-dom"
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"

const User = () => {
    const location = useLocation()
    const {state} = location
    /*const user = ...
    if (!user) {
      return null
    }
   console.log('blogs: ', state)
   console.log('location : ', location)*/
  
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
        <h3>Added blogs:</h3>
        {state?.map(blog => (
            <p key={blog.id}>{blog.title} by {blog.author}</p>
        ))}
      </div>
    )
  }

export default User