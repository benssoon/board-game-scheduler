// CSS
import './Home.css';

// Components

// Libraries

// Functions
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import {useState} from 'react';

function Home() {

    const [param, setParam] = useState('');

    return (
        <div className="main">
            <h1>Home</h1>

            <DisplayGrid
                type="event"
                preview={true}
                param={param}
            />
            <DisplayGrid
                type="game"
                preview={true}
                param={param}
            />
            <DisplayGrid
                type="user"
                preview={true}
                param={param}
            />

        </div>
    );
}

export default Home;