import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import { Table, Form, Button } from 'react-bootstrap'

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

            <Form onSubmit={addBlog}>
            <Form.Group>
                <input
                    data-testid='title'
                    placeholder="Type title..."
                    name="title"
                />
             </Form.Group>
             <Form.Group>
                <Form.Control
                    data-testid='author'
                    placeholder="Type author..."
                    name="author"
                />
                </Form.Group>
                <Button variant="primary" type="submit">save</Button>
            </Form>
        </div>
    )
}

export default BlogForm