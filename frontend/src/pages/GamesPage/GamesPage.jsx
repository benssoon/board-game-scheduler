import './GamesPage.css';

// Components
import Card from '../../components/Card/Card.jsx';

// Libraries

// Functions
import {useEffect, useState} from 'react';
import {fetchGames, createGame, deleteGame, deleteGames, fetchEvents} from '../../helpers/httpRequests.js';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {handleFormChange} from '../../helpers/handlers.js';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';

function GamesPage() {
    //<editor-fold desc="State">
    const initialGameFormState = {
        title: '',
        description: '',
    }
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const [gameId, setGameId] = useState(2);
    const [allGames, setAllGames] = useState([]);
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function handleDeleteChange(e) {
        const newValue = e.target.value;

        if (newValue <= 1) {
            setGameId(2);
        } else {
            setGameId(newValue);
        }
    }

    function handleGameSubmit(e) {
        setGameFormState(initialGameFormState);
        createGame(e, gameFormState);
    }
    //</editor-fold>

    useEffect(() => {
        fetchGames(setAllGames);
    }, []);

    return (
        <div className="categoryPage">
            <h2>Games</h2>

            {/*<editor-fold desc="Create Game Form">*/}
            <h2>Create Game</h2>
            <form onSubmit={handleGameSubmit}>
                <label htmlFor="gameTitle">Game title:</label>
                <input
                    type="text"
                    name="title"
                    id="gameTitle"
                    value={gameFormState.title}
                    onChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <label htmlFor="gameDescription">Description:</label>
                <input
                    type="text"
                    name="description"
                    id="gameDescription"
                    value={gameFormState.description}
                    onChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <button type="submit">Submit</button>
            </form>
            {/*</editor-fold>*/}

            {/*<editor-fold desc="Delete Game Form">*/}
            <form onSubmit={(e) => deleteGame(e, gameId)}>
                <label htmlFor="deleteGameId">Game ID:</label>
                <input
                    type="number"
                    name="deleteGameId"
                    id="deleteGameId"
                    value={gameId}
                    onChange={handleDeleteChange}
                />
                <button type="submit">Delete game</button>
            </form>
            {/*</editor-fold>*/}

            <button type="button" onClick={deleteGames}>Delete all</button>

            {/*<editor-fold desc="Games Grid">*/}
            <section className="categoryBox">
                <FiltersBox/>
                <DisplayGrid
                    type="game"
                    collection={allGames}
                />
            </section>
            {/*</editor-fold>*/}
        </div>
    );
}

export default GamesPage;