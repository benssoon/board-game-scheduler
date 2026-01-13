import './InfoBox.css';
import {useNavigate} from 'react-router-dom';

function InfoBox({type, children, parentPage, parentType, isEditable}) {
    const navigate = useNavigate();

    return (
        <div className={`info-box`}>
            <div className={'info-header'}>
                <h3>{type.charAt(0).toUpperCase() + type.slice(1)} {parentType}</h3>
                {isEditable && <button type="button" onClick={() => navigate(`${parentPage}/edit`)}>Edit</button>}
            </div>
            <section className={`${type}-info`}>
                {children}
            </section>
        </div>
    );
}

export default InfoBox;