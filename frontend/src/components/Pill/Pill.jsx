import './Pill.css';

function Pill( {item, setFilters, setParam} ) {

    function deletePill() {
        setFilters(prev => {
            return prev.filter((it) => {
                it.id !== item.id;
            });
        });
        setParam(prev => {
            if (prev === `gameId=${item.id}`) {
                return '';
            }
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