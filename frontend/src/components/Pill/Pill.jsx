import './Pill.css';

function Pill( {item, setFilters} ) {

    function deletePill() {
        setFilters(prev => {
            prev.filter((it) => {
                it.id !== item.id
            })
        })
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