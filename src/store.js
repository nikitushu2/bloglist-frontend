import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer.js"
import blogReducer from "./reducers/blogReducer.js";
import userReducer from "./reducers/userReducer.js";

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer
    }
})

export default store