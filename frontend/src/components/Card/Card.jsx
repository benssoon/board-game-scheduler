import './Card.css';

function Card({type, data, className}) {
    /*switch (type) {
        case 'event':
            const title = data.title;
            break;
        case 'game':
            const game = data;
            break;
        default:
            break;
    }*/
    return (
        <article className={className}>
            <div className="placeholder"></div>
            <ul>
                {data.title && <li>Title: {data.title}</li>}
                {data.game && <li>Game: {data.game}</li>}
                {data.host && <li>Host: {data.host}</li>}
                {data.isFull && <li>Game full</li>}
                {data.location && <li>Location: {data.location}</li>}
                {data.players && data.players.length>0 && <li>Players: {data.players}</li>}
                {data.possibleTimes && <li>Possible times: {data.possibleTimes}</li>}
            </ul>
        </article>
    )
}

export default Card;