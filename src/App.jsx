import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification"
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, login, logout, allUsers } from './reducers/userReducer'
import store from "./store.js"
import {Link} from "react-router-dom"
import { Table } from 'react-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const allBlogs = useSelector(state => state.blogs)
    const users = useSelector(state => state.root.users)
    const user = useSelector(state => state.root.user)

    useEffect(() => {
        dispatch(initializeBlogs())
      }, [])

    useEffect(() => {
        dispatch(initializeUser())
    }, [])

    useEffect(() => {
        dispatch(allUsers())
    }, [])

    /*useEffect(() => {
        console.log('Updated users:', users)
        console.log('Full Redux state:', store.getState())
    }, [allBlogs])*/

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                dispatch(notification(returnedBlog.title, 5))
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        await dispatch(login(username, password))
        setUsername('')
        setPassword('')
       
    }

    const handleLogOut = async (event) => {
        event.preventDefault()

        await dispatch(logout())
        setUsername('')
        setPassword('')
    }


    function handleRemoveBlog(id) {
        setBlogs(blogs.filter(blog => blog.id !== id))
    }


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
            <h2>blogs</h2>

            {user === null ?
                (
                    <Togglable style={{marginBottom: '5px'}}buttonLabel='login'>
                        <LoginForm
                            username={username}
                            password={password}
                            handleUsernameChange={({ target }) => setUsername(target.value)}
                            handlePasswordChange={({ target }) => setPassword(target.value)}
                            handleSubmit={handleLogin}
                        />
                    </Togglable>
                ) :
                <div className="blog-list">
                    <p>{user.username} logged-in</p>
                    <button style={{marginBottom: '5px'}} onClick={handleLogOut}>Log out</button>
                    <Togglable buttonLabel='create' ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                    <Notification />
                    <Table striped>
                        <tbody>
                    {allBlogs && [...allBlogs].sort((a, b) => b.likes - a.likes).map(blog =>
                        <tr key={blog.id}><td><Blog key={blog.id} blog={blog} currentUser={user} removeBlog={handleRemoveBlog} /></td></tr>
                    )}
                    </tbody>
                    </Table>
                </div>
            }

            {/*<h2>Users</h2>
            {users && [...users].map(user => (
                <p key={user.id}><Link to={`/${user.id}`} state={ user.blogs }>{user.username}</Link> has {user.blogs.length} blogs created</p>
            ))}*/}
        </div>
    )
}

export default App