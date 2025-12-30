import './Detail.css';
import {useState} from 'react';
import FormField from '../FormField/FormField.jsx';
import {handleFormChange} from '../../helpers/handlers.js';

function Detail({name, label, value}) {
    const [editing, toggleEditing] = useState(false);
    const [formState, setFormState] = useState({[name]: ''})

    function handleSubmit() {

    }
    return (
        <form onSubmit={handleSubmit}>
            {editing ?
                <FormField
                    label={label}
                    type={'text'}
                    id={name}
                    name={name}
                    formState={formState}
                    handleChange={(e) => handleFormChange(e, formState, setFormState)}
                />
                :
                <div className={'userDetail'}>
                    <p>{label}: {value}</p>
                    <button type={'button'} onClick={() => toggleEditing(true)}>Edit</button>
                </div>
            }
        </form>
    );
}

export default Detail;