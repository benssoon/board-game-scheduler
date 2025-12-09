import './GamesPage.css';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {useEffect, useRef, useState} from 'react';
import {createGamePostRequest, deleteGame, deleteGames} from '../../helpers/httpRequests.js';
import {handleFormChange} from '../../helpers/handlers.js';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {concatKeysValues} from '../../helpers/processingAndFormatting.js';
import FormField from '../../components/FormField/FormField.jsx';

function GamesPage() {
    //<editor-fold desc="State">
    const initialGameFormState = {
        title: '',
        description: '',
        minPlayers: 0,
        maxPlayers: 0,
        minAge: 0,
        maxAge: 99,
    }
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const [gameId, setGameId] = useState(2);
    const [errorArray, setErrorArray] = useState([])
    const [formError, setFormError] = useState(null);
    //</editor-fold>

    const titleRef = useRef(null);

    //<editor-fold desc="Effects">
    useEffect(() => {
        if (formError) {
            console.log('formError:')
            console.log(formError);
        }
    }, [formError])
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
        e.preventDefault();
        const cleanData = Object.fromEntries( // Return an object with empty strings converted to null.
            Object.entries(gameFormState).map(([key, value]) =>
                [key, value || null]
            )
        );
        console.log(cleanData)
        createGamePostRequest(e, cleanData, setErrorArray, setFormError);
        setGameFormState(initialGameFormState);
        titleRef.current.focus();
    }
    //</editor-fold>

    //<editor-fold desc="Functions">
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Games</h2>

            {/*<editor-fold desc="Create Game Form">*/}
            {/*Make this a component!*/}
            <h2>Create Game</h2>
            <form onSubmit={handleGameSubmit} className="gameForm">
                <FormField
                    ref={titleRef}
                    label="Game title"
                    type="text"
                    name="title"
                    id="gameTitle"
                    formState={gameFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <FormField
                    label="Description"
                    type="text"
                    name="description"
                    id="gameDescription"
                    formState={gameFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <FormField
                    label="Minimum players"
                    type="number"
                    name="minPlayers"
                    id="minPlayers"
                    formState={gameFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <FormField
                    label="Maximum players"
                    type="number"
                    name="maxPlayers"
                    id="maxPlayers"
                    formState={gameFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <FormField
                    label="Minimum age"
                    type="number"
                    name="minAge"
                    id="minAge"
                    formState={gameFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <FormField
                    label="Maximum Age"
                    type="number"
                    name="maxAge"
                    id="maxAge"
                    formState={gameFormState}
                    errors={formError}
                    handleChange={(e) => handleFormChange(e, gameFormState, setGameFormState)}
                />
                <button type="submit">Submit</button>
            </form>
            {errorArray &&
                <ul>
                    {
                        errorArray.map((err) => {
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