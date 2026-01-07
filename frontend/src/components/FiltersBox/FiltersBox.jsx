import './FiltersBox.css';

import SearchBar from '../SearchBar/SearchBar.jsx';
import Pill from '../Pill/Pill.jsx';

import {useEffect, useState} from 'react';

function FiltersBox({setParam, searchingFor}) {
    const [filters, setFilters] = useState([]);

    // Set the url parameter for filtering events by game.
    useEffect(() => {
        let urlParameter = '';
        for (const filtersKey in filters) {
            if (urlParameter && filters[filtersKey].param) {
                urlParameter = urlParameter + '&' // If there is more than one filter given, separate them by '&' in the parameter.
            }
            urlParameter = urlParameter + filters[filtersKey].param;
        }
        if (urlParameter) {
            setParam(urlParameter);
        }
    }, [filters]);

    return (
        <div className="filtersBox">
            <SearchBar
                setFilters={setFilters}
                searchingFor={searchingFor}
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