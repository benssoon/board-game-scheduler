import './Preview.css';
import Card from '../Card/Card.jsx';

const cardTestData = {
    title: 'test',
}
function Preview() {
    return (
        <>
            <Card data={cardTestData} className="preview"/>
        </>
    );
}

export default Preview;