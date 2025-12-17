import './FiltersBox.css';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Pill from '../Pill/Pill.jsx';

import {useEffect, useState} from 'react';

function FiltersBox({setParam}) {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        let p = '';
        for (const filtersKey in filters) {
            if (p && filters[filtersKey].param) {
                p=p+'&'
            }
            p = p + filters[filtersKey].param;
        }
        if (p) {
            setParam(p);
        }
    }, [filters]);
    return (
        <div className="filtersBox">
            <SearchBar
                setFilters={setFilters}
            />
            <ul className="pills">
                {filters.map((item) => {
                return <li key={item.id}>
                    <Pill
                        item={item}
                        setFilters={setFilters}
                    />
                </li>
            })}
            </ul>
        </div>
    );
}

export default FiltersBox;