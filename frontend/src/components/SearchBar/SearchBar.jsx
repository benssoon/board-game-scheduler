import './SearchBar.css';
import {useEffect, useMemo, useState} from 'react';
import useFetch from '../../helpers/useFetch.js';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';

function SearchBar({setParam}) {

    const [searchText, setSearchText] = useState('');

    const {data: games} = useFetch('/games');

    useEffect(() => {
        console.log(matchingGames)
    }, [searchText]);

    const matchingGames = useMemo(() => {
        if (!searchText) return [];
        const lowered = searchText.toLowerCase();
        return games.filter((game) => {
            return game.title.toLowerCase().includes(lowered)
        });
    }, [searchText, games]);

    // Add a search parameter to the url used for DisplayGrid
    function handleSubmit(e) {
        e.preventDefault();
        setParam('gameId=7');
    }

    function handleSearchChange(e) {
        setSearchText(e.target.value)
    }

    return (
        <div className="searchBarContainer">
            <form onSubmit={handleSubmit}>
                <input
                    className="searchBar"
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="searchButton">O</button>
            </form>

            <SearchDropdown
                visible={matchingGames.length > 0}
                items={matchingGames}
                onSelect={(game) => {
                    setParam(`gameId=${game.id}`);
                    setSearchText(game.title);
                }}
            />

        </div>
    );
}

export default SearchBar;