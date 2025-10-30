export function handleFormChange(e, formState, setFormState) {
    const changedFieldName = e.target.name;
    const newValue = e.target.value;

    setFormState({
        ...formState,
        [changedFieldName]: newValue,
    });
}

export function handleTextChange(e, state, setState) {
    const newValue = e.target.value;

    setState(newValue);
}