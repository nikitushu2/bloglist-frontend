import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders title', () => {
    const blog = {
        title: 'Amazon Forests',
        author: 'J. Rowling'
    }

    render(<Blog blog={blog} />)

    const element1 = screen.getByText('Amazon Forests')
    expect(element1).toBeDefined()
})

test('clicking the View button shows likes', async () => {
    const blog = {
        title: 'Amazon Forests',
        author: 'J. Rowling',
        likes: 0
    }

    render(
        <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const element1 = screen.getByText(/likes/i)
    expect(element1).toBeDefined()
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const input = screen.getByPlaceholderText('Type title...')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
})
