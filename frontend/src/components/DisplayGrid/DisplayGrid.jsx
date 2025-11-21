import './DisplayGrid.css';
import Card from '../Card/Card.jsx';
import useFetch from '../../useFetch.js';

function DisplayGrid({type}) {
    const endpoint = '/' + type + 's';
    const { data: collection, loading, error } = useFetch(endpoint);
    return (
        <div className="displayGrid">
            {loading || !collection ?
                <p>Loading...</p>
                :
                collection.map((item) => {
                        return (<Card
                                key={item.id}
                                type={type}
                                data={item}
                                className={type + " card"}
                            />
                        )
                    })
            }
        </div>
    );
}

export default DisplayGrid;