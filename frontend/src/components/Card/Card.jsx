import './Card.css';
import {parseDate} from '../../helpers/processingAndFormatting.js';
import {Link} from 'react-router-dom';

function Card({type, data, className}) {
    // type is 'user', 'game' or 'event'
    console.log(data)

    return (
        <article>
            <Link className={className} to={type==='user' ? `/users/${data.username || data }` : `/${type}s/${data.id}`}>
                <div className="placeholder"></div>
                <ul>
                    {data.title && <li>Title: {data.title}</li>}
                    {data.username || (type==='user' && data) && <li>Username: {data.username || data}</li>}
                    {data.name && !data.username && <li>Name: {data.name}</li>}
                    {data.game?.id && <li>Game: {data.game.title}</li>}
                    {data.host && <li>Host: {data.host.username}</li>}
                    {data.definitiveTime && <li>Date: {parseDate(data.definitiveTime)}</li>}
                </ul>
            </Link>
        </article>
    )
}

export default Card;