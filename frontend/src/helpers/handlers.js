import userIcon from '../assets/icons/Symbol=User.svg';
import gameIcon from '../assets/icons/Symbol=Game.svg';
import eventIcon from '../assets/icons/Symbol=Calendar.svg';

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

    // Don't allow gameId to be set to negative.
    if (name === 'gameId' && newValue < 0) {
        newValue = 0;
    }

    setFormState({
        ...formState,
        [name]: newValue,
    });
}

export function handleUserImageError(e) {
    e.currentTarget.onError = null; // prevent infinite loop
    e.currentTarget.src = userIcon;
}

export function handleGameImageError(e) {
    e.currentTarget.onError = null;
    e.currentTarget.src = gameIcon;
}

export function handleEventImageError(e) {
    e.currentTarget.onError = null;
    e.currentTarget.src = eventIcon;
}