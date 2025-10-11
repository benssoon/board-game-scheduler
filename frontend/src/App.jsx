import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EventCard from './components/eventCard/EventCard.jsx';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>Hello</h1>
            <EventCard/>
        </>
    )
}

export default App
