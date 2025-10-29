import './Card.css';

function Card({title, game, host, isFull, location, players, possibleTimes, className}) {
    return (
        <article className={className}>
            <div className="placeholder">

            </div>
            <ul>
                <li>Title: {title}</li>
                <li>Game: {game}</li>
                <li>Host: {host}</li>
                {isFull && <li>Game full</li>}
                <li>Location: {location}</li>
                <li>Players: {players}</li>
                <li>Possible times: {possibleTimes}</li>
            </ul>
        </article>
    )
}

export default Card;