import './GameForm.css';
import useFetch from '../../helpers/useFetch.js';
import {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import InfoBox from '../InfoBox/InfoBox.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';
import {cleanupData} from '../../helpers/processingAndFormatting.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {handleFormChange} from '../../helpers/handlers.js';
import FormField from '../FormField/FormField.jsx';

function GameForm({type}) { // type is either create or edit
    const {id} = useParams();
    const [formError, setFormError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [updated, setUpdated] = useState(0);
    const titleRef = useRef(null);
    const endpoint = id ? `/games/${id}` : null;
    const {data: game} = useFetch(endpoint, {});
    const initialGameFormState = {
        title: '',
        description: '',
        minPlayers: 0,
        maxPlayers: 99,
        complexity: '',
        minAge: 0,
        maxAge: 99,
        activeEvents: [],
    }
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (game) {
            setGameFormState({
                title: game.title,
                description: game.description,
                minPlayers: game.minPlayers,
                maxPlayers: game.maxPlayers,
                complexity: game.complexity,
                minAge: game.minAge,
                maxAge: game.maxAge,
                activeEvents: game.activeEvents,
            });
        }
    }, [game]);

    async function handleCreateGameSubmit(e) {
        e.preventDefault();
        const cleanData = cleanupData(gameFormState);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(API + '/events', cleanData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response);
            setFormError(null);
            setSubmitError(null);
        } catch (er) {
            console.error(er)
            const response = er.response.data;
            if (er.status === 400) { // Get the response from backend in state to put on the page
                setFormError(response);
            } else {
                setSubmitError(response);
            }
            return response;
        }
        setGameFormState(initialGameFormState);
        setUpdated(updated+1);
        titleRef.current.focus();
        if (id) {
            navigate(`/games/${id}`);
        } else {
            navigate('/games');
        }
    }

    return (
        <InfoBox
            type={type}
            parentType={'game'}
        >
            <form onSubmit={handleCreateGameSubmit} className="create-form">
                    <FormField
                        start={titleRef}
                        isRequired
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
        </InfoBox>
    );
}

export default GameForm;