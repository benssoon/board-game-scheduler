import './Pill.css';
import {useState} from 'react';

function Pill( {toggleVisible} ) {

    function deletePill() {
        toggleVisible(false);
    }

    return (
        <div className="pill">
            <span>Hello</span>
            <button
                className="deletePill"
                onClick={deletePill}
            >X</button>
        </div>
    );
}

export default Pill;