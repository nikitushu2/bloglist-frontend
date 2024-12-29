import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blog = ({ blog, currentUser }) => {
    const [details, setDetails] = useState(false)
    const dispatch = useDispatch()
    const updatedBlog = useSelector(state => state.blogs.find(b => b.id === blog.id))
    const likes = updatedBlog ? updatedBlog.likes : blog.likes


    useEffect(() => {
      console.log('blog: ', blog)
  }, [])

    function handleLikeIncrease() {
        dispatch(like(blog.id))
    }

    function handleDelete() {
        dispatch(removeBlog(blog.id))
    }

    return (
        <div className="blog">
            <Link to={`/blogs/${blog.id}`} state={{id: blog.id, title: blog.title, author: blog.author, likes: blog.likes, username: blog.user.username, comments: blog.comments}}>{blog.title}</Link>{' '}
            {details && blog.author} {details && ' '}
            {details && (likes ? likes : 0)}{details && ' likes'}
            {(currentUser.username === blog.user.username) && details && <button style={{marginLeft: '5px'}} onClick={handleDelete}>Delete</button>}
            <button style={{marginInline: '5px'}} onClick={() => setDetails(!details)}>{details ? 'Hide' : 'View'}</button>
            <button onClick={handleLikeIncrease}>Like</button>
        </div>
    )
}

export default Blog