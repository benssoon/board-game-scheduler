import './Game.css';
import {useParams} from 'react-router-dom';
import useFetch from '../../helpers/useFetch.js';

function Game() {
    const {id} = useParams();
    const {data: game, loading, error} = useFetch(`/games/${id}`)
    return (
        <>
            <h2>ID is: {id}</h2>
        </>
    );
}

export default Game;