import './SearchBar.css';
import {useState} from 'react';
import {handleTextChange} from '../../helpers/handlers.js';

function SearchBar() {

    const [searchText, setSearchText] = useState('');

    return (
        <div className="searchBar">
            <input
                value={searchText}
                onChange={(e) => handleTextChange(e, setSearchText)}
            />
            <button className="searchButton">O</button>
        </div>
    );
}

export default SearchBar;