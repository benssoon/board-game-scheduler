import './GamePage.css';
import {useParams} from 'react-router-dom';

function GamePage() {
    const {id} = useParams();
    return (
        <>
            <h2>ID is: {id}</h2>
        </>
    );
}

export default GamePage;