import './InfoBox.css';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

function InfoBox({type, children, parentPage, parentType, resourceType}) {
    const navigate = useNavigate();
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)} {parentType}</h2>
            <section>
                {isAuth && type === 'about' && <button type="button" onClick={() => navigate(`${parentPage}/edit`)}>Edit</button>}
                {children}
            </section>
        </>
    );
}

export default InfoBox;