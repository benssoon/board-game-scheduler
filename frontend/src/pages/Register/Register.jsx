import './Register.css';
import FormField from '../../components/FormField/FormField.jsx';
import {useState} from 'react';
import {handleFormChange} from '../../helpers/handlers.js';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {useNavigate} from 'react-router-dom';

function Register() {
    const initialUserFormState = {
        username: '',
        password: '',
        name: '',
        emailAddress: '',
        telephoneNumber: '',
        age: 0,
        area: '',
        street: '',
        house: 0,
        city: '',
        postalCode: '',
        state: '',
        country: '',
        address: 'test address',
        roles: ['USER'],
    }
    const [userFormState, setUserFormState] = useState(initialUserFormState);
    const [formError, setFormError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitError(null);
        setFormError(null);
        console.log(userFormState)
        try {
            const response = await axios.post(`${API}/users`, userFormState)
            console.log(response)
        } catch (er) {
            console.log(er);
            const response = er.response.data;
            if (er.status === 400) { // get response from backend
                if (typeof response === 'object') {
                    setFormError(response)
                } else {
                    setSubmitError(response)
                }
            }
        }
        navigate('/login');
    }

    return (
        <>
            <h2>Hi</h2>
            <form onSubmit={handleSubmit}>
                {/*Username*/}
                <FormField
                    isRequired
                    label={'Username'}
                    type={'text'}
                    id={'username'}
                    name={'username'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Password*/}
                <FormField
                    isRequired
                    label={'Password'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Name*/}
                <FormField
                    isRequired
                    label={'Name'}
                    type={'text'}
                    id={'name'}
                    name={'name'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Email*/}
                <FormField
                    isRequired
                    label={'Email Address'}
                    type={'email'}
                    id={'emailAddress'}
                    name={'emailAddress'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Phone*/}
                <FormField
                    isRequired
                    label={'Phone Number'}
                    type={'tel'}
                    id={'telephoneNumber'}
                    name={'telephoneNumber'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Age*/}
                <FormField
                    label={'Age'}
                    type={'number'}
                    id={'age'}
                    name={'age'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Area*/}
                <FormField
                    label={'Area'}
                    type={'text'}
                    id={'area'}
                    name={'area'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Street Name*/}
                <FormField
                    label={'Street Name'}
                    type={'text'}
                    id={'street'}
                    name={'street'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*House Number*/}
                <FormField
                    label={'House Number'}
                    type={'number'}
                    id={'house'}
                    name={'house'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*City*/}
                <FormField
                    label={'City'}
                    type={'text'}
                    id={'city'}
                    name={'city'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Postal Code*/}
                <FormField
                    label={'Postal Code'}
                    type={'text'}
                    id={'postalCode'}
                    name={'postalCode'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*State*/}
                <FormField
                    label={'State/Province'}
                    type={'text'}
                    id={'state'}
                    name={'state'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {/*Country*/}
                <FormField
                    label={'Country'}
                    type={'text'}
                    id={'country'}
                    name={'country'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                <button type={'submit'}>Submit</button>
                {submitError && <span className={'field-error'}>
                    {submitError}
                </span>}
            </form>
        </>
    );
}

export default Register;