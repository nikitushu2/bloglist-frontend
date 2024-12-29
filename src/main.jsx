import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store.js'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import User from './components/User.jsx'
import BlogInfo from './components/BlogInfo.jsx'
import Users from './components/Users.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<App />} />
        <Route path="/users" element={<Users />} />
        <Route path="/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogInfo />} />
        </Routes>
    </BrowserRouter>
    </Provider>)