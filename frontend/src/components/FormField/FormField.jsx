import './FormField.css';
import {useEffect, useState} from 'react';

function FormField({ref, label, type, id, name, formState, handleChange, errors}) {
    const [error, setError] = useState('');
    useEffect(() => {
        if (errors && name in errors) {
            console.log(errors[name]);
            setError(
                <span className="field-error">
                    <p>{label} {errors[name]}</p>
                </span>
            )
        }
        else {
            setError(null)
        }
    }, [errors]);
    return (
        <>
            <span className="form-field">
                <label htmlFor={id}>{label}:</label>
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    id={id}
                    value={formState[name]}
                    onChange={handleChange}
                />
            </span>
            {errors && error}
        </>
    );
}

export default FormField;