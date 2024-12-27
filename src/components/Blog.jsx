import { useState, useEffect, useContext } from 'react'
import blogService from '../services/blogs'
import Context from '../Context'

const Blog = ({ blog, currentUser, removeBlog }) => {
    const [details, setDetails] = useState(false)
    const [likes, setLikes] = useState(blog.likes || 0)
    const {updateBlogMutation, deleteBlogMutation} = useContext(Context)

    /*useEffect(() => {
      console.log('Current user: ', currentUser)
      console.log('blog: ', blog)
  }, [])

    useEffect(() => {
      setLikes(blog.likes || 0)
  }, [blog])*/

    function handleLikeIncrease() {
        /*const updatedLikes = likes + 1;

        blogService.update(blog.id, {
            user: blog.user.id,
            likes: updatedLikes,
            author: blog.author,
            title: blog.title
        }).then((returnedBlog) => {
          console.log(returnedBlog);
          setLikes(returnedBlog.likes)})*/
          console.log(blog)
          updateBlogMutation.mutate({ 
            id: blog.id,
            updatedBlog: { ...blog, likes: blog.likes + 1 },
        })
    }

    function handleDelete() {
        //blogService.remove(blog.id).then(() => removeBlog(blog.id))
        deleteBlogMutation.mutate(blog.id)
    }

    return (
        <div className="blog">
            {blog.title}{' '}
            {details && blog.author} {details && ' '}
            {details && (blog.likes ? blog.likes : 0)}{details && ' likes'}
            {(currentUser.username === blog.user.username) && details && <button onClick={handleDelete}>Delete</button>}
            <button onClick={() => setDetails(!details)}>{details ? 'Hide' : 'View'}</button>
            <button onClick={handleLikeIncrease}>Like</button>
        </div>
    )
}

export default Blog