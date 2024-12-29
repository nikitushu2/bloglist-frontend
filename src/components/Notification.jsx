import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) return null
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div className="container">
      <Alert variant="success">
      {notification}
      </Alert>
    </div>
  )
}

export default Notification