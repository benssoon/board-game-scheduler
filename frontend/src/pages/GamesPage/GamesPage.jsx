import './GamesPage.css';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {useEffect, useState} from 'react';
import {deleteGame, deleteGames} from '../../helpers/httpRequests.js';
import {handleFormChange} from '../../helpers/handlers.js';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {concatKeysValues} from '../../helpers/helpers.js';

function GamesPage() {
    //<editor-fold desc="State">
    const initialGameFormState = {
        title: '',
        description: '',
    }
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const [gameId, setGameId] = useState(2);
    const [formError, setFormError] = useState(null);
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

    //<editor-fold desc="Functions">
    async function createGame(e) {
        e.preventDefault();
        try {
            const response = await axios.post(API+'/games', gameFormState)
            console.log(response);
        } catch (er) {
            const response = er.response.data;
            const errors = concatKeysValues(response);
            setFormError(errors);
        }
    }
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Games</h2>

            {/*<editor-fold desc="Create Game Form">*/}
            {/*Make this a component!*/}
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
            {formError &&
                <ul>
                    {
                        formError.map((err) => {
                            return <li key={err}>{err}</li>
                        })
                    }
                </ul>
            }
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
                />
            </section>
            {/*</editor-fold>*/}
        </div>
    );
}

export default GamesPage;