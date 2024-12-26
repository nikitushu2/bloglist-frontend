import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs.js"
import loginService from "../services/login.js"

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        set(state, action) {
            return action.payload
        },
        clear() {
            return null
        }
    }
})

export const { set, clear } = userSlice.actions

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(set(user))
            blogService.setToken(user.token)
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })

        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        blogService.setToken(user.token)

        dispatch(set(user))
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(clear())
    }
}

export default userSlice.reducer