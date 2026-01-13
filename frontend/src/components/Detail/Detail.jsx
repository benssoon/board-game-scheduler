import './Detail.css';
import {useState} from 'react';
import FormField from '../FormField/FormField.jsx';
import {handleFormChange} from '../../helpers/handlers.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';

function Detail({url, name, label, value, update, logo}) {
    // If no url is given, then the detail is not editable.
    const [editing, toggleEditing] = useState(false);
    const [formState, setFormState] = useState({[name]: value})

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(value)
        console.log(url)
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.patch(url, formState, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                toggleEditing(false);
                update(prev => prev + 1);
            } catch (er) {
                console.log(er);
            }
        }
    }
    return (
        editing ?
            <form onSubmit={handleSubmit}>
                <div className={'in-line-form'}>
                    <FormField
                        isHorizontal
                        label={label}
                        type={'text'}
                        id={name}
                        name={name}
                        formState={formState}
                        handleChange={(e) => handleFormChange(e, formState, setFormState)}
                    />
                    <button type={'submit'}>Save</button>
                    <button type={'button'} onClick={() => toggleEditing(false)}>Cancel</button>
                </div>
            </form>
            :
            <div className={'detail'}>
                {logo && <img src={logo} alt={`Icon of a ${name}`}/>}
                <p>{label && `${label}:`} {value}</p>
                {url && <button type={'button'} onClick={() => toggleEditing(true)}>Edit</button>}
            </div>
    );
}

export default Detail;