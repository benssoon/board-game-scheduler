import './SearchDropdown.css';

function SearchDropdown({visible, items, onSelect}) {
    if (!visible) return null;
    return (
        <ul className="dropdownList">
            {items.map((item) => {
                return <li
                    key={item.id}
                    className={"dropdownItem"}
                    onClick={() => onSelect(item)}
                >
                    {item.title}
                </li>
            })}
        </ul>
    )
}

export default SearchDropdown;