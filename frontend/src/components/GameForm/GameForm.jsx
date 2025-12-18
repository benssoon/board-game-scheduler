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
    const titleRef = useRef(null);
    const endpoint = id ? `/games/${id}` : null;
    const {data: game} = useFetch(endpoint, {});
    const initialGameFormState = {
        title: '',
        description: '',
        minPlayers: 0,
        maxPlayers: 0,
        complexity: '',
        minAge: 0,
        maxAge: 99,
        activeEvents: [],
    }
    const [gameFormState, setGameFormState] = useState(initialGameFormState);
    const navigate = useNavigate();
    const {user, isAdmin, isUser} = useContext(AuthContext);

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

    async function handleSubmit(e) {
        e.preventDefault();
        if (isAdmin || (isUser && type === 'create')) { // Both users and admins can create games
            const cleanData = cleanupData(gameFormState);
            const token = localStorage.getItem('token');
            try {
                const response = await axios[(type === 'create' && 'post') || (type === 'edit' && 'put')](API + '/games' + (type === 'edit' && `/${id}`), cleanData, {
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
                console.log(response)
                if (er.status === 400) { // Get the response from backend in state to put on the page
                    setFormError(response);
                } else {
                    setSubmitError(response);
                }
                return response;
            }
            if (id) {
                navigate(`/games/${id}`);
            } else {
                navigate('/games');
            }
        } else {
            console.log(`User must have the role ADMIN${type === 'create' && ' or USER'} to ${type} a game.`)
        }
    }

    async function deleteGame() {
        if (isAdmin) {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.delete(`${API}/games/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response);
            } catch (er) {
                console.error(er.message);
                console.error(er.response)
                console.error(`${API}/events/${id}`);
            }
        } else {
            console.log(`User must be logged in as ADMIN to delete a game.`)
        }
        navigate("/games");
    }

    return (
        <InfoBox
            type={type}
            parentType={'game'}
        >
            <form onSubmit={handleSubmit} className="create-form">
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
                <button type="button" onClick={() => navigate(id ? `/games/${id}` : '/games')}>Cancel</button>
                {/* Display an error on the page if there is any other error than expected. TODO remove unnecessary? */}
                {submitError && <span className={'field-error'}>
                    {submitError}
                </span>}
            </form>
            {type === 'edit' && <button type="button" onClick={deleteGame}>Delete</button>}
        </InfoBox>
    );
}

export default GameForm;