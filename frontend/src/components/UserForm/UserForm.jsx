import './UserForm.css';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../helpers/useFetch.js';
import {jwtDecode} from 'jwt-decode';
import {API} from '../../globalConstants.js';
import {handleFormChange} from '../../helpers/handlers.js';
import FormField from '../FormField/FormField.jsx';

function UserForm({type}) {
    const initialUserFormState = {
        username: '',
        currentPassword: '',
        password: '',
        repeatPassword: '',
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
    const matchingPasswordError = <span className={'field-error'}>Passwords must match</span>;
    const dontUsePasswords = true;
    const [userFormState, setUserFormState] = useState(initialUserFormState);
    const [formError, setFormError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [passwordsMatch, togglePasswordsMatch] = useState(true);
    const [passwordIsNew, togglePasswordIsNew] = useState(true);
    const token = localStorage.getItem('token');
    const username = token && jwtDecode(token).sub;
    const endpoint = type === 'edit' ? `/users/${username}` : null;
    const {data: user} = useFetch(endpoint, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUserFormState({
                ...userFormState,
                username: user.username,
                name: user.name,
                emailAddress: user.emailAddress,
                telephoneNumber: user.telephoneNumber,
                age: user.age,
                area: user.area,
                address: user.address,
            });
        }
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (userFormState.password === userFormState.repeatPassword && userFormState.password !== userFormState.currentPassword || dontUsePasswords) {
            togglePasswordsMatch(true);
            setSubmitError(null);
            setFormError(null);
            try {
                console.log(userFormState);
                const response = await axios[type === 'create' && 'post' || type === 'edit' && 'put'](
                    `${API}/users` + (type === 'edit' ? `/${username}` : ''),
                    userFormState,
                    type === 'edit' && {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                console.log(response);
            } catch (er) {
                console.log(er);
                const response = er.response.data;
                if (er.status === 400) { // get response from backend
                    if (typeof response === 'object') {
                        setFormError(response);
                        return response;
                    } else {
                        setSubmitError(response);
                        return response;
                    }
                }
            }
            navigate('/login');
        } else {
            if (userFormState.password !== userFormState.repeatPassword) {
                togglePasswordsMatch(false);
            }
            if (userFormState.password === userFormState.currentPassword) {
                togglePasswordIsNew(false);
            }
        }
    }
    return (
        <>
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
                {/*Current Password TODO Currently does nothing. Needs backend logic to be usable.*/}
                {type === 'edit' && <FormField
                    isRequired
                    label={'Current Password'}
                    type={'password'}
                    id={'currentPassword'}
                    name={'currentPassword'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {type === 'edit' && <span className={'field-error'}>DO NOT TRY UPDATING PASSWORD! DOES NOT WORK PROPERLY ON BACKEND YET.</span>}
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
                {type === 'edit' && <span className={'field-error'}>DO NOT TRY UPDATING PASSWORD! DOES NOT WORK PROPERLY ON BACKEND YET.</span>}
                {/*Repeat Password*/}
                <FormField
                    isRequired
                    label={'Repeat Password'}
                    type={'password'}
                    id={'repeatPassword'}
                    name={'repeatPassword'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />
                {userFormState.password !== userFormState.repeatPassword && matchingPasswordError}
                {type === 'edit' && <span className={'field-error'}>DO NOT TRY UPDATING PASSWORD! DOES NOT WORK PROPERLY ON BACKEND YET.</span>}
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
                {
                    submitError && <span className={'field-error'}>
                    {submitError}
                    </span>
                    ||
                    !passwordsMatch && matchingPasswordError
                    ||
                    !passwordIsNew && <span className={'field-error'}>
                    New password must be different than current password.
                    </span>
                }
            </form>
        </>
    );
}

export default UserForm;