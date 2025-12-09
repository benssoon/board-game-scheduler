import './FormField.css';
import {useEffect, useState} from 'react';

function FormField({ref, isRequired, label, type, id, name, formState, handleChange, errors}) {
    const [error, setError] = useState('');
    useEffect(() => {
        if (formState[name] === null) {
            console.error(`formState.${name} must not be null`);
        }
    }, [formState]);
    useEffect(() => {
        if (errors && name in errors) {
            if (type === "checkbox") {
                setError(
                    <span className="field-error">
                        <p>This must be checked</p>
                    </span>
                )
            } else {
                setError(
                    <span className="field-error">
                        <p>{label} {errors[name]}</p>
                    </span>
                )
            }
        }
        else {
            setError(null)
        }
    }, [errors]);
    return (
        <>
            <span className={`form-field${type === 'checkbox' || type === 'datetime-local' ? ` ${type}` : ''}`}>
                <label htmlFor={id}>{label}{isRequired && <em>*</em>}</label>
                <input
                    //TODO CHANGE THE NAME OF ref TO SOMETHING ELSE BECAUSE REACT ALREADY USES THAT!!!
                    ref={ref}
                    type={type}
                    name={name}
                    id={id}
                    value={formState[name]}
                    onChange={handleChange}
                />
                {errors && error}
            </span>
        </>
    );
}

export default FormField;