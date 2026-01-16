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

            <DisplayGrid
                type="event"
                preview
            />
            <DisplayGrid
                type="game"
                preview
            />
            <DisplayGrid
                type="user"
                preview
            />

        </div>
    );
}

export default Home;