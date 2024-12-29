
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { comment, initializeBlogs } from "../reducers/blogReducer"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export default function BlogInfo() {
    //const location = useLocation()
    const dispatch = useDispatch()
    //const {state} = location
    const { id } = useParams()
    //const blogs = useSelector(state => state.blogs)
    //const blog = blogs.find(blog => blog.id === state.id)
    const blog = useSelector(state => {
        console.log('state: ', state)
        return state.blogs.find(blog => blog.id === id)})
    
    useEffect(() => {
        if (!blog) {
            dispatch(initializeBlogs())
        }
    }, [dispatch, blog])

    // Handle loading state while the blog is being fetched
    if (!blog) {
        return <p>Loading blog information...</p>
        }


    function addComment(event) {
        event.preventDefault()
        const newComment = event.target.comment.value
        event.target.comment.value = ''
        dispatch(comment(id, newComment))

    }

    return (
        <>
        <h2>Blog info</h2>
        <h3>{blog.title} by {blog.author}</h3>
        <p>has {blog.likes} likes</p>
        <p>added by {blog.username}</p>
        <h2>Comments</h2>
        <form onSubmit={addComment}>
                <input
                    data-testid='comment'
                    placeholder="Type comment..."
                    name="comment"
                />
                <button type="submit">add</button>
        </form>
        {blog.comments.map((comment, index) => (
            <p key={index}>{comment}</p>
        ))}
        </>
    )
}