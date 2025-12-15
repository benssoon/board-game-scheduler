import './InfoBox.css';
import {useNavigate} from 'react-router-dom';

function InfoBox({type, children, parentPage}) {
    const navigate = useNavigate();

    return (
        <>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <section>
                {type === 'about' && <button type="button" onClick={() => navigate(`${parentPage}/edit`)}>Edit</button>}
                {children}
            </section>
        </>
    );
}

export default InfoBox;