import './Games.css';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {useContext, useEffect, useRef, useState} from 'react';
import {handleFormChange} from '../../helpers/handlers.js';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import FormField from '../../components/FormField/FormField.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';

function Games() {
    //<editor-fold desc="State">
    const initialGameFormState = {
        title: '',
        description: '',
        minPlayers: 0,
        maxPlayers: 0,
        minAge: 0,
        maxAge: 99,
    }
    const [param, setParam] = useState('');
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const [gameId, setGameId] = useState(2);
    const [errorArray, setErrorArray] = useState([]);
    const [formError, setFormError] = useState(null);
    const [updated, setUpdated] = useState(0);
    //</editor-fold>

    const {isAdmin} = useContext(AuthContext);
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

    async function handleGameSubmit(e) {
        e.preventDefault();
        const cleanData = cleanupData(gameFormState);
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post(API + '/games', cleanData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
            } catch (er) {
                const response = er.response.data
                setFormError(response);
                console.error(response);
                return response;
            }
            setUpdated(updated + 1);
        } else {
            console.error('User must be logged in to create new events.');
            //TODO add on-page error
        }
        setGameFormState(initialGameFormState);
        //TODO add updated state to reload DisplayGrid
        titleRef.current.focus();
    }
    //</editor-fold>

    //<editor-fold desc="Functions">
    async function deleteGames(e) {
        e.preventDefault();
        if (isAdmin) {
            try {
                const response = await axios.delete(`${API}/games`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log(response);
            } catch (er) {
                console.error(er);
            }
            setUpdated(updated + 1);
        } else {
            console.error('Only an admin can delete all games.')
        }
        setUpdated(prevState => prevState+1);
    }
    //</editor-fold>

    return (
        <div className="categoryPage">
            <h2>Games</h2>

            {/*<editor-fold desc="Create Game Form">*/}
            {/*Make this a component!*/}
            <h2>Create Game</h2>
            <form onSubmit={handleGameSubmit} className="create-form">
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

            <button type="button" onClick={deleteGames}>Delete all</button>

            {/*<editor-fold desc="Games Grid">*/}
            <section className="categoryBox">
                <FiltersBox/>
                <DisplayGrid
                    type="game"
                    updated={updated}
                    param={param}
                />
            </section>
            {/*</editor-fold>*/}
        </div>
    );
}

export default Games;