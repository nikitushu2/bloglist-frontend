import axios from 'axios'
const baseUrl = '/api/login'
const userUrl = '/api/users'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const getUsers = async () => {
    const response = await axios.get(userUrl)
    return response.data
}

export default { login, getUsers }