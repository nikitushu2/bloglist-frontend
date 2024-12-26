import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'

const BlogForm = ({ createBlog }) => {
    const dispatch = useDispatch()

    const addBlog = (event) => {
        event.preventDefault()
        /*createBlog({
            title: newBlog.title,
            author: newBlog.author
        })*/
        const title = event.target.title.value
        event.target.title.value = ''
        const author = event.target.author.value
        event.target.author.value = ''
        dispatch(create(title, author))
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <input
                    data-testid='title'
                    placeholder="Type title..."
                    name="title"
                />
                <input
                    data-testid='author'
                    placeholder="Type author..."
                    name="author"
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm