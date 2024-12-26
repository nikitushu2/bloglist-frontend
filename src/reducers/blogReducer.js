import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs.js"


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        updateLike(state, action) {
            return state.map(blog =>
                blog.id === action.payload.id
                    ? action.payload // New object
                    : blog
            )
        },
        append(state, action) {
            state.push(action.payload)
        },
        set(state, action) {
            return action.payload
        },
        remove(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        }
    }
})


export const { append, set, updateLike, remove } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(set(blogs))
    }
}

export const create = (title, author) => {
    return async dispatch => {
        const newBlog = await blogService.create({ title, author, likes: 0 })
        console.log('newBlog:', newBlog)
        dispatch(append(newBlog))
    }
}

export const like = id => {
    return (dispatch, getState) => {
        const state = getState()
        const blogToLike = state.blogs.find(blog => blog.id === id)

        console.log('blogToLike: ', blogToLike)

        const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }

        blogService.update(updatedBlog.id, updatedBlog).then(() => {
            dispatch(updateLike(updatedBlog))
            dispatch(initializeBlogs())
            console.log('Updated blogs state:', getState().blogs)
        })


    }
}

export const removeBlog = id => {
    return async (dispatch, getState) => {
        const state = getState()
        const blogToDelete = state.blogs.find(blog => blog.id === id)

        await blogService.remove(id)
        dispatch(remove(blogToDelete))
    }
}

export default blogSlice.reducer