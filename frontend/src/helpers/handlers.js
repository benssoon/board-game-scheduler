export function handleFormChange(e, formState, setFormState) {
    const { name, type, value, checked } = e.target;

    let newValue;

    switch (type) {
        case 'checkbox':
            newValue = checked;
            break;
        case 'number':
            newValue = value === '' ? null : Number(value);
            break;
        default:
            newValue = value;
            break;
    }

    if (name === 'gameId' && newValue < 0) {
        newValue = 0;
    }
    setFormState({
        ...formState,
        [name]: newValue,
    });
}

export function handleTextChange(e, state, setState) {
    const newValue = e.target.value === '' ? null : e.target.value;

    setState(newValue);
}