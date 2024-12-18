import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', likes: 0 })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author
        })
        setNewBlog({ title: '', author: '', likes: 0 })
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <input
                    data-testid='title'
                    placeholder="Type title..."
                    value={newBlog.title}
                    onChange={event => setNewBlog({ ...newBlog, title: event.target.value })}
                />
                <input
                    data-testid='author'
                    placeholder="Type author..."
                    value={newBlog.author}
                    onChange={event => setNewBlog({ ...newBlog, author: event.target.value })}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm