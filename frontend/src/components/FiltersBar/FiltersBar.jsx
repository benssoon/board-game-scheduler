import './FiltersBar.css';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Pill from '../Pill/Pill.jsx';

import {useState} from 'react';

function FiltersBar() {

    const [pillVisible, togglePillVisible] = useState(true);
    const test = true;

    return (
        <div className="filtersBar">
            <SearchBar/>
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
        </div>
    );
}

export default FiltersBar;