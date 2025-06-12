import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<any>(null)
  const[latestMessage , setLatestMessage] = useState("")
  const[message , setMessage] = useState("")


  useEffect(() => {

    // Create a new WebSocket connection
    const socket = new WebSocket('ws://localhost:8080') //no need to import Websocket as it's natively present in the browser APIs
    
    // Connection is OPEN
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }

    // Listen for messages
    socket.onmessage = (message) => {
      console.log('Received message:' , message.data)
      setLatestMessage(message.data)
    }

    // Close connection
    return () => {
      socket.close()
    }

  }, [])

  if(!socket){
    return <div>
        Connecting to socket server...
    </div>
  }

  return (
    <>
      <input onChange={(e) => setMessage(e.target.value)}></input>
      <button onClick={ () => {
        socket.send(message);
      }}>Send</button>
      {latestMessage}
    </>
  )
}

export default App
