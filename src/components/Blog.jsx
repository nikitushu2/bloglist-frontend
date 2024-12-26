import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {
    const [details, setDetails] = useState(false)
    const dispatch = useDispatch()
    const updatedBlog = useSelector(state => state.blogs.find(b => b.id === blog.id))
    const likes = updatedBlog ? updatedBlog.likes : blog.likes


    /*useEffect(() => {
      console.log('Current user: ', currentUser)
      console.log('blog: ', blog)
  }, [])*/

    function handleLikeIncrease() {
        dispatch(like(blog.id))
    }

    function handleDelete() {
        dispatch(removeBlog(blog.id))
    }

    return (
        <div className="blog">
            {blog.title}{' '}
            {details && blog.author} {details && ' '}
            {details && (likes ? likes : 0)}{details && ' likes'}
            {(currentUser.username === blog.user.username) && details && <button onClick={handleDelete}>Delete</button>}
            <button onClick={() => setDetails(!details)}>{details ? 'Hide' : 'View'}</button>
            <button onClick={handleLikeIncrease}>Like</button>
        </div>
    )
}

export default Blog