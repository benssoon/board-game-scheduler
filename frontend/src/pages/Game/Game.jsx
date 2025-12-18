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
    const {isAdmin, isUser} = useContext(AuthContext);

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
            </>
            :
            loading ?
                <p>Loading...</p>
                :
                error && <p>Error!</p>
    );
}

export default Game;