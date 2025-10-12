import './EventCard.css';

function EventCard({title, game, host, isFull, location, players, possibleTimes}) {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                <li>Game: {game}</li>
                <li>Host: {host}</li>
                {isFull && <li>Game full</li>}
                <li>Location: {location}</li>
                <li>Players: {players}</li>
                <li>Possible times: {possibleTimes}</li>
            </ul>
        </>
    )
}

export default EventCard;