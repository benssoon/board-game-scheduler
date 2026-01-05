import './Roles.css';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import Notification from '../Notification/Notification.jsx';

function Roles({username}) {
    const [roles, setRoles] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [newRole, setNewRole] = useState('');

    const token = localStorage.getItem('token');
    const {isAdmin} = useContext(AuthContext);

    useEffect(() => {
        getUserRoles();
    }, [success, error]);

    async function getUserRoles() {
        try {
            const response = await axios.get(`${API}/users/${username}/roles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRoles(response.data);
            console.log(response);
        } catch (er) {
            const response = er.response;
            console.log(response);
        }
    }

    async function deleteUserRole(role) {
        try {
            const response = await axios.delete(`${API}/users/${username}/roles/${role}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRoles(roles.filter((mappedRole) => {
                return mappedRole.role.split("_")[1] !== role;
            }));
            console.log(response);
            setSuccess(`Role ${role} has been removed from user ${username}.`);
        } catch (er) {
            const response = er.response;
            console.log(response);
            setError(response.data);
        }
    }

    async function addUserRole(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/users/${username}/roles?roleName=${newRole}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setSuccess(`Role ${newRole} has been added to user ${username}.`);
        } catch (er) {
            const response = er.response;
            console.log(response);
            console.log(isAdmin)
            if (response.status === 403) {
                setError("You do not have the correct permissions to do that.");
            } else {
                setError(response.data);
            }
        }
    }

    function handleNewRoleChange(e) {
        const newValue = e.target.value;
        setNewRole(newValue);
    }

    return (
        <>
            {isAdmin &&
                <div>
                    <button type={'button'} onClick={getUserRoles}>Get Roles</button>
                    {roles && <ul>{
                        roles.map((role) => {
                            const roleName = role.role.split("_")[1]; // get the role name without "ROLE_"
                            return <li key={role.role}>{roleName} <button type={'button'} onClick={() => deleteUserRole(roleName)}>Delete</button> </li>
                        })
                    }</ul>}
                    <form onSubmit={addUserRole}>
                        <label htmlFor={'newRole'}>New Role:</label>
                        <input
                            type={'text'}
                            id={'newRole'}
                            name={'newRole'}
                            value={newRole}
                            onChange={handleNewRoleChange}
                        />
                        <button type={'submit'}>Add Role</button>
                    </form>
                    {error && <Notification setParent={setError} isError>{error}</Notification>}
                    {success && <Notification setParent={setSuccess}>{success}</Notification> }
                </div>
            }
        </>

    );
}

export default Roles;