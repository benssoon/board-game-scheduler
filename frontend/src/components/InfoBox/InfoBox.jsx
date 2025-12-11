import './InfoBox.css';
import useFetch from '../../helpers/useFetch.js';

function InfoBox({type, children}) {

    return (
        <>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <section>
                {children}
            </section>
        </>
    );
}

export default InfoBox;