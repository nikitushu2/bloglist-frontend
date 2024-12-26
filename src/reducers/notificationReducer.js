import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        display(state, action) {
            if (action.payload) {
                return `${action.payload} was created`
            } else {
                return null
            }
        }
    }
})

export const { display } = notificationSlice.actions

export const notification = (content, time) => {
    return async dispatch => {
        dispatch(display(content))

        setTimeout(() => {
            dispatch(display(''))
        }, `${time}000`)
    }
}

export default notificationSlice.reducer