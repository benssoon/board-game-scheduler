import './FiltersBox.css';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Pill from '../Pill/Pill.jsx';

import {useState} from 'react';

function FiltersBox({setParam}) {
    const [filters, setFilters] = useState([]);
    return (
        <div className="filtersBox">
            <SearchBar
                setParam={setParam}
                filterItem={setFilters}
            />
            <ul className="pills">
                {filters.map((item) => {
                return <li key={item.id}>
                    <Pill
                        item={item}
                        setFilters={setFilters}
                        setParam={setParam}
                    />
                </li>
            })}
            </ul>
        </div>
    );
}

export default FiltersBox;