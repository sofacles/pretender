import { useState } from 'react'
import GameWrapper from "./pretender/GameWrapper";
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameWrapper />
    </>
  )
}

export default App
