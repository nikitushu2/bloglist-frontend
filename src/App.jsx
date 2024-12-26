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
import { initializeUser, login, logout } from './reducers/userReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const allBlogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
      }, [])

    useEffect(() => {
        dispatch(initializeUser())
    }, [])

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
        <div>
            <h2>blogs</h2>

            {user === null ?
                (
                    <Togglable buttonLabel='login'>
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
                    <button onClick={handleLogOut}>Log out</button>
                    <Togglable buttonLabel='create' ref={blogFormRef}>
                        <BlogForm createBlog={addBlog} />
                    </Togglable>
                    <Notification />
                    {[...allBlogs].sort((a, b) => b.likes - a.likes).map(blog =>
                        <Blog key={blog.id} blog={blog} currentUser={user} removeBlog={handleRemoveBlog}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App