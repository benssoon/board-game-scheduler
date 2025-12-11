import './EventPage.css';
import {useParams} from 'react-router-dom';
import InfoBox from '../../components/InfoBox/InfoBox.jsx';

function EventPage() {
    const {id} = useParams();
    return (
        <>
            <h2>ID is: {id}</h2>
            <InfoBox
                type="about"
            />
            <InfoBox
                type="details"
            />
            <InfoBox
                type="participants"
            />
        </>
    );
}

export default EventPage;