import './Card.css';
import {parseDate} from '../../helpers/processingAndFormatting.js';
import {Link} from 'react-router-dom';

function Card({type, data, className}) {
    // type is 'user', 'game' or 'event'
    console.log(data)

    return (
        <article className={className}>
            <div className="placeholder"></div>
            <Link to={type==='user' ? `/users/${data.username || data }` : `/${type}s/${data.id}`}>
                <ul>
                    {data.title && <li>Title: {data.title}</li>}
                    {data.username || (type==='user' && data) && <li>Username: {data.username || data}</li>}
                    {data.name && !data.username && <li>Name: {data.name}</li>}
                    {data.game?.id && <li>Game: {data.game.title}</li>}
                    {data.host && <li>Host: {data.host.username}</li>}
                    {data.isFull && <li>Game full</li>}
                    {data.location && <li>Location: {data.location}</li>}
                    {data.players && data.players.length > 0 && <li>Players:
                        <ul>{data.players.map((player) => {
                            return (<li key={player}>{player}</li>);
                        })}</ul>
                    </li>}
                    {data.possibleTimes && data.possibleTimes.length > 0 && <li>Possible Times:
                        <ul>{data.possibleTimes.map((time) => {
                            return (<li key={time}>{parseDate(time)}</li>);
                        })}</ul>
                    </li>}
                    {data.definitiveTime && <li>Date: {parseDate(data.definitiveTime)}</li>}
                </ul>
            </Link>
        </article>
    )
}

export default Card;