import './DisplayGrid.css';
import Card from '../Card/Card.jsx';

function DisplayGrid({type, collection}) {
    return (
        <div className="displayGrid">
            {collection.map((item) => {
                return (<Card
                        key={item.id}
                        type={type}
                        data={item}
                        className={type + " card"}
                    />
                )
            })}
        </div>
    );
}

export default DisplayGrid;