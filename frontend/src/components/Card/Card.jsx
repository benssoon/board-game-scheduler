import './Card.css';

function Card({type, data, className}) {
    return (
        <article className={className}>
            <div className="placeholder"></div>
            <ul>
                {data.title && <li>Title: {data.title}</li>}
                {data.username && <li>Username: {data.username}</li>}
                {data.name && !data.username && <li>Name: {data.name}</li>}
                {data.game && <li>Game: {data.game}</li>}
                {data.host && <li>Host: {data.host}</li>}
                {data.isFull && <li>Game full</li>}
                {data.location && <li>Location: {data.location}</li>}
                {data.players && data.players.length>0 && <li>Players:
                    <ul>{data.players.map((player) => {
                        return (<li key={player}>player</li>);
                    })}</ul>
                </li>}
                {data.possibleTimes && <li>Possible times: {data.possibleTimes}</li>}
                {data.definitiveTime && <li>Definitive time: {data.definitiveTime}</li>}
            </ul>
        </article>
    )
}

export default Card;