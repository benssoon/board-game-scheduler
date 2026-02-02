import './Pill.css';

function Pill( {item, setFilters} ) {

    function deletePill() {
        setFilters(prev => {
            return prev.filter((it) => {
                return it.id !== item.id; // Return an array with all values of filters except the one that matches the one in this Pill.
            });
        });
    }

    return (
        <div className="pill">
            <span>{item.name}</span>
            <button
                className="deletePill"
                onClick={deletePill}
            >X</button>
        </div>
    );
}

export default Pill;