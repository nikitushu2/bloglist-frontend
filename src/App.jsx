import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [details, setDetails] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loginVisible, setLoginVisible] = useState(false)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => {
            const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs( sortedBlogs )
        }
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })
        setSuccessMessage('Blog added successfully')
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })


            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )


            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogOut = async (event) => {
        event.preventDefault()

        try {

            window.localStorage.removeItem('loggedBlogappUser')

            setUser(null)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Something went wrong with the logout')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
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
                    {successMessage && successMessage}
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} currentUser={user} removeBlog={handleRemoveBlog}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App