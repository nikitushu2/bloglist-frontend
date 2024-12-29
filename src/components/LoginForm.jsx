import PropTypes from 'prop-types'
import { Table, Form, Button } from 'react-bootstrap'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {

    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleUsernameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }

    return (
        <div>
            <h2>Login</h2>

            <Form onSubmit={handleSubmit}>
                <div>
                <Form.Group>
                <Form.Label>username</Form.Label>
                    <Form.Control
                        data-testid='username'
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </Form.Group>
                </div>
                <div>
                <Form.Group>
                <Form.Label>password</Form.Label>
                    <Form.Control
                        data-testid='password'
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                </div>
                <Button variant="primary" type="submit">login</Button>
            </Form>
        </div>
    )
}

export default LoginForm