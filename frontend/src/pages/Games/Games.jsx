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
import {useNavigate} from 'react-router-dom';

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

    const {isAdmin, isUser} = useContext(AuthContext);
    const titleRef = useRef(null);
    const navigate = useNavigate();

    //<editor-fold desc="Effects">
    useEffect(() => {
        if (formError) {
            console.log('formError:')
            console.log(formError);
        }
    }, [formError])
    //</editor-fold>

    //<editor-fold desc="Handlers">
    function createGame() {
        if (isAdmin || isUser) {
            navigate('/games/create')
        } else {
            console.error('Only users with the role USER or ADMIN can create a game.');
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

            <button type="button" onClick={createGame}>Create Game</button>

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