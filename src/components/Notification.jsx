import { useState, useEffect } from "react"

const Notification = ({text}) => {
  const [msg, setMsg] = useState(null)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  useEffect(() => {
    setMsg(text)
    const timer = setTimeout(() => {
      setMsg(null)
    }, 5000)

    return () => clearTimeout(timer) 
  }, [text])

  if (!msg) {
    return null
  }

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
