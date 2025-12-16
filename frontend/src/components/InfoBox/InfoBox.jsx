import './InfoBox.css';
import {useNavigate} from 'react-router-dom';

function InfoBox({type, children, parentPage, parentType}) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    function hanldeClick() {
        if (token) {
            navigate(`${parentPage}/edit`)
        } else {
            console.error('User must be logged in to create new events.');
            //TODO add on-page error
        }
    }

    return (
        <>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)} {parentType}</h2>
            <section>
                {type === 'about' && <button type="button" onClick={hanldeClick}>Edit</button>}
                {children}
            </section>
        </>
    );
}

export default InfoBox;