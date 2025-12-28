import './Game.css';
import {useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

function Game() {
    const {id} = useParams();
    const {data: game, loading, error} = useFetch(`/games/${id}`, {})
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