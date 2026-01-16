import './Games.css';
import FiltersBox from '../../components/FiltersBox/FiltersBox.jsx';
import {useContext, useState} from 'react';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

function Games() {
    const [param, setParam] = useState('');
    const [updated, setUpdated] = useState(0);

    const {isAdmin, isUser} = useContext(AuthContext);
    const navigate = useNavigate();

    //<editor-fold desc="Handlers">
    function createGame() {
        if (isAdmin || isUser) {
            navigate('/games/create')
        } else {
            console.error('Only users with the role USER or ADMIN can create a game.');
        }
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
            <div className={'categoryHeader'}>
                <h2>Games</h2>
                {(isAdmin || isUser) && <InfoBox
                    type={'actions'}
                >
                    {isUser && <button type="button" onClick={createGame}>Create Game</button>}
                    {isAdmin && <button type="button" onClick={deleteGames}>Delete all</button>}
                </InfoBox>}
            </div>
            {/*<editor-fold desc="Games Grid">*/}
            <section className="categoryBox">
                <FiltersBox
                    setParam={setParam}
                    searchingFor={'games'}
                />
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