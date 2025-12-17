import './SearchBar.css';
import {useEffect, useMemo, useState} from 'react';
import useFetch from '../../helpers/useFetch.js';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';

function SearchBar({setFilters}) {

    const [searchText, setSearchText] = useState('');
    const [selectedGameId, setSelectedGameId] = useState(0);

    const {data: games} = useFetch('/games');

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
        if (selectedGameId > 0) {
            setFilters(prev => [
                ...prev,
                {
                    id: selectedGameId,
                    name: searchText,
                    param: `gameId=${selectedGameId}`
                },
            ]);
        } else {
            console.error("Please select a game from the dropdown")
        }
    }

    function handleTextChange(e) {
        setSearchText(e.target.value);
        setSelectedGameId(0);
    }

    function handleSelect(game) {
        setSelectedGameId(game.id);
        setSearchText(game.title);
    }

    return (
        <div className="searchBarContainer">
            <form onSubmit={handleSubmit}>
                <input
                    className="searchBar"
                    value={searchText}
                    onChange={handleTextChange}
                />
                <button type="submit" className="searchButton">O</button>
            </form>

            <SearchDropdown
                visible={matchingGames.length > 0}
                items={matchingGames}
                onSelect={handleSelect}
            />

        </div>
    );
}

export default SearchBar;