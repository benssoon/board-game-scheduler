import './Game.css';
import {useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import {useContext, useRef, useState} from 'react';
import {handleFormChange} from '../../helpers/handlers.js';
import {AuthContext} from '../../context/AuthContext.jsx';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import GameForm from '../../components/GameForm/GameForm.jsx';

function Game() {
    const initialGameFormState = {
        title: '',
        description: '',
        minPlayers: 0,
        maxPlayers: 0,
        minAge: 0,
        maxAge: 99,
        complexity: '',
    }
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const [formError, setFormError] = useState(null);
    const [errorArray, setErrorArray] = useState([])
    const [updated, setUpdated] = useState(0);
    const {id} = useParams();
    const {data: game, loading, error} = useFetch(`/games/${id}`, {}, updated)
    const {isAuth, isAdmin, isUser, user} = useContext(AuthContext);
    const titleRef = useRef(null);

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
        } else {
            console.error('User must be logged in to create new events.');
            //TODO add on-page error
        }
        setGameFormState(initialGameFormState);
        //TODO add updated state to reload DisplayGrid
        titleRef.current.focus();
    }

    return (
        game ?
            <>
                <h2>{game.title}</h2>
                <InfoBox
                    type="about"
                    parentPage={`/games/${id}`}
                    isEditable={isAdmin || isUser}
                >
                    <p>{game.description}</p>
                </InfoBox>
                <InfoBox
                    type="details"
                >
                    <p>Minimum Players: {game.minPlayers}</p>
                    <p>Maximum Players: {game.maxPlayers}</p>
                    <p>Minimum Age: {game.minAge}</p>
                    <p>Maximum Age: {game.maxAge}</p>
                    <p>Complexity: {game.complexity}</p>
                </InfoBox>


                {/*<editor-fold desc="Create Game Form">*/}
                <GameForm
                    type={'create'}
                />
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

            </>
            :
            loading ?
                <p>Loading...</p>
                :
                error && <p>Error!</p>
    );
}

export default Game;