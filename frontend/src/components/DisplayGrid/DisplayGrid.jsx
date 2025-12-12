import './DisplayGrid.css';
import Card from '../Card/Card.jsx';
import useFetch from '../../helpers/useFetch.js';

function DisplayGrid({type, preview, updated, param}) {
    const classname = preview ? "displayPreview" : "displayGrid";
    const endpoint = `/${type}s` + (param && `?${param}`)
    const { data: collection, loading, error } = useFetch(endpoint, {}, updated);
    return (
        <div className={classname}>
            {loading || !collection ?
                <p>Loading...</p>
                :
                collection.map((item) => {
                    return (<Card
                            key={item.id || item.username}
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