import { createSlice } from '@reduxjs/toolkit'
import blogService from "../services/blogs.js"
import loginService from "../services/login.js"
import { combineReducers } from 'redux'

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload
        },
        clear() {
            return null
        }
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        getUsers(state, action) {
            return state
        },
        setUsers(state, action) {
            return action.payload
        },
    }
})

export const { set, clear } = userSlice.actions
export const { getUsers, setUsers } = usersSlice.actions

export const allUsers = () => {
    return async dispatch => {
        const users = await loginService.getUsers()
        if (users) {
            dispatch(setUsers(users))
        }
    }
}

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

const rootReducer = combineReducers({
    user: userSlice.reducer,
    users: usersSlice.reducer
})

export default rootReducer