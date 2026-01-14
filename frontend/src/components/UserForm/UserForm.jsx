import './UserForm.css';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../helpers/useFetch.js';
import {jwtDecode} from 'jwt-decode';
import {API} from '../../globalConstants.js';
import {handleFormChange} from '../../helpers/handlers.js';
import FormField from '../FormField/FormField.jsx';

function UserForm({type, fields}) {
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
    const requiredFields = ['username', 'password', 'repeatPassword', 'name', 'emailAddress', 'telephoneNumber']
    const matchingPasswordError = <span className={'field-error'}>Passwords must match</span>;
    const [userFormState, setUserFormState] = useState(initialUserFormState);
    const [formError, setFormError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [passwordsMatch, togglePasswordsMatch] = useState(true);
    const [passwordIsNew, togglePasswordIsNew] = useState(true);
    const [emptyRequiredFields, setEmptyRequiredFields] = useState([]);
    const [submittedWithError, toggleSubmittedWithError] = useState(false);

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

    useEffect(() => {
        if (userFormState.password === userFormState.repeatPassword) {
            togglePasswordsMatch(true);
        } else {
            togglePasswordsMatch(false);
        }
        if (userFormState.currentPassword) {
            if (userFormState.password !== userFormState.currentPassword) {
                togglePasswordIsNew(true);
            } else {
                togglePasswordIsNew(false);
            }
        }
    }, [userFormState.password, userFormState.repeatPassword]);

    useEffect(() => {
        if (userFormState.emailAddress) {
            if (!userFormState.emailAddress.includes('@')) {
                setFormError(prev => ({
                    ...prev,
                    emailAddress: 'must include @'
                }))
            }
        }
    }, [userFormState.emailAddress]);

    useEffect(() => {
        setEmptyRequiredFields(
            requiredFields.filter((fieldName) => !userFormState[fieldName])
        );
    }, [userFormState]);

    useEffect(() => {
        if (submittedWithError || formError && Object.keys(formError).length > 0) { // Update errors dynamically only after the user has clicked Submit.
            setFormError(
                emptyRequiredFields.reduce((acc, fieldName) => {
                    acc[fieldName] = 'is required.';
                    return acc;
                }, {})
            );
        }
    }, [emptyRequiredFields, submittedWithError]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (emptyRequiredFields.length > 0) { // Update errors
            /*setFormError(
                emptyRequiredFields.reduce((acc, fieldName) => {
                    acc[fieldName] = 'is required.';
                    return acc;
                }, {})
            );*/
            toggleSubmittedWithError(true);
        } else if (passwordsMatch && passwordIsNew) {
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
        }
    }

    return (
        <>
            <form className={'create-form'} onSubmit={handleSubmit}>
                {/*Username*/}
                {(!fields || fields?.includes('username')) && <FormField
                    isRequired={requiredFields.includes('username')}
                    label={'Username'}
                    type={'text'}
                    id={'username'}
                    name={'username'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Current Password TODO Currently does nothing. Needs backend logic to be usable.*/}
                {type === 'edit' && (!fields || fields?.includes('password')) && <FormField
                    isRequired={requiredFields.includes('currentPassword')}
                    label={'Current Password'}
                    type={'password'}
                    id={'currentPassword'}
                    name={'currentPassword'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {type === 'edit' && (!fields || fields?.includes('password')) && <span className={'field-error'}>DO NOT TRY UPDATING PASSWORD! DOES NOT WORK PROPERLY ON BACKEND YET.</span>}
                {/*Password*/}
                {(!fields || fields?.includes('password')) && <FormField
                    isRequired={requiredFields.includes('password')}
                    label={'Password'}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {type === 'edit' && (!fields || fields?.includes('password')) && <span className={'field-error'}>DO NOT TRY UPDATING PASSWORD! DOES NOT WORK PROPERLY ON BACKEND YET.</span>}
                {/*Repeat Password*/}
                {(!fields || fields?.includes('password')) && <FormField
                    isRequired={requiredFields.includes('repeatPassword')}
                    label={'Repeat Password'}
                    type={'password'}
                    id={'repeatPassword'}
                    name={'repeatPassword'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {(!fields || fields?.includes('password'))
                    && !passwordsMatch
                    && matchingPasswordError}
                {type === 'edit' && (!fields || fields?.includes('password')) && <span className={'field-error'}>DO NOT TRY UPDATING PASSWORD! DOES NOT WORK PROPERLY ON BACKEND YET.</span>}
                {/*Name*/}
                {(!fields || fields?.includes('name')) && <FormField
                    isRequired={requiredFields.includes('name')}
                    label={'Name'}
                    type={'text'}
                    id={'name'}
                    name={'name'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Email*/}
                {(!fields || fields?.includes('email')) && <FormField
                    isRequired={requiredFields.includes('emailAddress')}
                    label={'Email Address'}
                    type={'email'}
                    id={'emailAddress'}
                    name={'emailAddress'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Phone*/}
                {(!fields || fields?.includes('phone')) && <FormField
                    isRequired={requiredFields.includes('telephoneNumber')}
                    label={'Phone Number'}
                    type={'tel'}
                    id={'telephoneNumber'}
                    name={'telephoneNumber'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Age*/}
                {(!fields || fields?.includes('age')) && <FormField
                    isRequired={requiredFields.includes('age')}
                    label={'Age'}
                    type={'number'}
                    id={'age'}
                    name={'age'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Area*/}
                {(!fields || fields?.includes('area')) && <FormField
                    isRequired={requiredFields.includes('area')}
                    label={'Area'}
                    type={'text'}
                    id={'area'}
                    name={'area'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Street Name*/}
                {(!fields || fields?.includes('street')) && <FormField
                    isRequired={requiredFields.includes('street')}
                    label={'Street Name'}
                    type={'text'}
                    id={'street'}
                    name={'street'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*House Number*/}
                {(!fields || fields?.includes('house')) && <FormField
                    isRequired={requiredFields.includes('house')}
                    label={'House Number'}
                    type={'number'}
                    id={'house'}
                    name={'house'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*City*/}
                {(!fields || fields?.includes('city')) && <FormField
                    isRequired={requiredFields.includes('city')}
                    label={'City'}
                    type={'text'}
                    id={'city'}
                    name={'city'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Postal Code*/}
                {(!fields || fields?.includes('postalCode')) && <FormField
                    isRequired={requiredFields.includes('postalCode')}
                    label={'Postal Code'}
                    type={'text'}
                    id={'postalCode'}
                    name={'postalCode'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*State*/}
                {(!fields || fields?.includes('state')) && <FormField
                    isRequired={requiredFields.includes('state')}
                    label={'State/Province'}
                    type={'text'}
                    id={'state'}
                    name={'state'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                {/*Country*/}
                {(!fields || fields?.includes('country')) && <FormField
                    isRequired={requiredFields.includes('country')}
                    label={'Country'}
                    type={'text'}
                    id={'country'}
                    name={'country'}
                    formState={userFormState}
                    handleChange={(e) => handleFormChange(e, userFormState, setUserFormState)}
                    errors={formError}
                />}
                <button type={'submit'}>Submit</button>
                {
                    submitError && <span className={'field-error'}>
                        {submitError}
                    </span>
                    ||
                    (!fields || fields?.includes('password')) && !passwordsMatch && matchingPasswordError
                    ||
                    (!fields || fields?.includes('password')) && !passwordIsNew && <span className={'field-error'}>
                        New password must be different than current password.
                    </span>
                }
            </form>
        </>
    );
}

export default UserForm;