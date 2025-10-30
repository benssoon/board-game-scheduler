import './FiltersBox.css';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Pill from '../Pill/Pill.jsx';

import {useState} from 'react';

function FiltersBox() {

    const [pillVisible, togglePillVisible] = useState(true);

    return (
        <div className="filtersBox">
            <SearchBar/>
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
            { pillVisible && <Pill toggleVisible={togglePillVisible}/> }
        </div>
    );
}

export default FiltersBox;