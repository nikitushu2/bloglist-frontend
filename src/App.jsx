import { useState, useEffect, useRef, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Notification from './components/Notification'
import Context from "./Context.js"

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CREATED":
          return `${action.payload} was created.`
      default:
          return state
    }
  }

const App = () => {
    const [details, setDetails] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loginVisible, setLoginVisible] = useState(false)
    const blogFormRef = useRef()

    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll
      })
    
    //const blogs = result.data
    //console.log(JSON.parse(JSON.stringify(result)))
    const { data: blogs, isLoading, isError, isSuccess, error } = result
    
    const newBlogMutation = useMutation({ 
        mutationFn: blogService.create,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] }),
            notificationDispatch({type: 'CREATED', payload: variables.title})
        }
    })

    const updateBlogMutation = useMutation({
        mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
        onSuccess: (data, variables) => {
          queryClient.invalidateQueries({ queryKey: ['blogs'] })
        },
        onError: (error) => {
            console.error('Error updating likes:', error)
        }
      })

      const deleteBlogMutation = useMutation({ 
        mutationFn: (id) => blogService.remove(id),
        onSuccess: (user) => {
            console.log(user)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )


            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        }
    })

    const loginUserMutation = useMutation({
        mutationFn: ({username, password}) => loginService.login({username, password}),
        onSuccess: (user) => {
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )


            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        },
        onError: (error) => {
            console.error('Error logging in:', error)
        }
    })

    /*useEffect(() => {
        blogService.getAll().then(blogs => {
            const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs( sortedBlogs )
        }
        )
    }, [])*/

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        try {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        } catch (error) {
            console.error("Error parsing user from localStorage:", error)
        }
    }, [])

    const addBlog = (blogObject) => {
        /*blogFormRef.current.toggleVisibility()

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
            })
        setSuccessMessage('Blog added successfully')
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)*/
        newBlogMutation.mutate(blogObject)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            /*const user = await loginService.login({
                username, password,
            })*/

            loginUserMutation.mutate({username, password})


            /*window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )


            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')*/
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
        <>
        <Context.Provider value={{updateBlogMutation, deleteBlogMutation}}>
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
                    <Notification text={notification} />
                    {isSuccess && blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} currentUser={user} removeBlog={handleRemoveBlog}/>
                    )}
                </div>
            }
        </div>
        </Context.Provider>
        </>
    )
}

export default App