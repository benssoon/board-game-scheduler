import './SearchBar.css';
import {useMemo, useState} from 'react';
import useFetch from '../../helpers/useFetch.js';
import SearchDropdown from '../SearchDropdown/SearchDropdown.jsx';

function SearchBar({filters, setFilters, formMember, start, name, id, formState, handleChange: setFormState, searchingFor}) {

    const [searchText, setSearchText] = useState('');
    const [selectedGameId, setSelectedGameId] = useState(0);
    const [selected, toggleSelected] = useState(false);
    const [focused, toggleFocused] = useState(false);

    const {data: games} = useFetch('/games');

    // Show the list of games with (partially) matching title to searchText
    const matchingGames = useMemo(() => {
        if (!searchText || selected) return [];
        const lowered = searchText.toLowerCase();
        return games.filter((game) => {
            return game.title.toLowerCase().includes(lowered)
        });
    }, [searchText, games]);

    // Add a search parameter to the url used for DisplayGrid
    function handleSubmit(e) {
        e.preventDefault();
        for (const key in filters) {
            if (filters[key].id === selectedGameId) return;
        }
        if (selectedGameId > 0) {
            setFilters(prev => [
                ...prev,
                {
                    id: selectedGameId,
                    name: searchText,
                    param:
                        searchingFor === 'games' ? `title=${searchText}` : `gameId=${selectedGameId}`,
                },
            ]);
        } else {
            console.error("Please select a game from the dropdown")
        }
    }

    function handleTextChange(e) {
        toggleSelected(false);
        setSearchText(e.target.value);
        if (formMember) {
            setFormState({
                ...formState,
                [name]: 0
            });
        } else {
            setSelectedGameId(0);
        }
    }

    function handleSelect(item) {
        toggleFocused(true)
        if (formMember) {
            setFormState({
                ...formState,
                [name]: item.id,
            });
        } else {
            setSelectedGameId(item.id);
        }
        setSearchText(item.title);
        toggleSelected(true);
    }

    const field = (
        <input
            className="searchBar"
            ref={start}
            type="text"
            name={name}
            id={id}
            value={searchText}
            onChange={handleTextChange}
            autoComplete="off"
        />
    );

    return (
        <div
            className="searchBarContainer"
            onFocusCapture={() => toggleFocused(true)}
            onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    toggleFocused(false)
                }
            }}
        >
            {formMember ?
                field
                :
                <form className={'searchForm'} onSubmit={handleSubmit}>
                    {field}
                    <button type="submit" className="searchButton">O</button>
                </form>
            }

            <SearchDropdown
                visible={matchingGames.length > 0 && focused}
                items={matchingGames}
                onSelect={handleSelect}
            />

        </div>
    );
}

export default SearchBar;