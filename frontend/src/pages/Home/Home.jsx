// CSS
import './Home.css';

// Components

// Libraries

// Functions
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';

function Home() {
    return (
        <div className="main">
            <h1>Home</h1>

            <DisplayGrid type="event" preview={true}/>
            <DisplayGrid type="game" preview={true}/>
            <DisplayGrid type="user" preview={true}/>

        </div>
    );
}

export default Home;