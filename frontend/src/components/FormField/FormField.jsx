import './FormField.css';
import {useEffect, useState} from 'react';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import SearchBar from '../SearchBar/SearchBar.jsx';

function FormField({start, isRequired, label, type, id, name, formState, handleChange, errors}) {
    const [error, setError] = useState('');

    useEffect(() => {
        if (formState[name] === null) {
            console.error(`formState.${name} must not be null`);
        }
    }, [formState]);

    useEffect(() => {
        if (errors){
            console.log(errors)
            console.log(name)
            console.log(name in errors)
        }
        if (errors && name in errors) {
            if (type === "checkbox") {
                setError(
                    <span className="field-error">
                        This must be checked
                    </span>
                )
            } else {
                setError(
                    <span className="field-error">
                        {label} {errors[name]}
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
                {type === 'date-picker' ?

                    <DatePicker
                        name={name}
                        id={id}
                        sort
                        plugins={[
                            <DatePanel/>,
                            <TimePicker/>,
                        ]}
                        value={formState[name]}
                        onChange={(dates) => handleChange({
                            target: {
                                name,
                                value: dates,
                            }
                        })}
                    />

                    :

                    type === 'filter' ?

                        <SearchBar
                            formMember
                            start={start}
                            name={name}
                            id={id}
                            formState={formState}
                            handleChange={handleChange}
                        />

                        :

                        <input
                            ref={start}
                            type={type}
                            name={name}
                            id={id}
                            {...(type === 'checkbox' ?
                                    {checked: formState[name]}
                                    : {value: formState[name]}
                            )}
                            onChange={handleChange}
                        />
                }
                {errors && error}
            </span>
        </>
    );
}

export default FormField;