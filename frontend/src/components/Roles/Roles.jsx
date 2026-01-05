import './Roles.css';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useState} from 'react';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import Notification from '../Notification/Notification.jsx';

function Roles({username}) {
    const [roles, setRoles] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const token = localStorage.getItem('token');
    const {isAdmin} = useContext(AuthContext);

    async function getUserRoles() {
        try {
            console.log(username)
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

    return (
        <>
            {isAdmin && <button type={'button'} onClick={getUserRoles}>Get Roles</button>}
            {roles && <ul>{
                roles.map((role) => {
                    const roleName = role.role.split("_")[1]; // get the role name without "ROLE_"
                    return <li key={role.role}>{roleName} <button type={'button'} onClick={() => deleteUserRole(roleName)}>Delete</button> </li>
                })
            }</ul>}
            {error && <Notification setParent={setError} isError>{error}</Notification>}
            {success && <Notification setParent={setSuccess}>{success}</Notification> }
        </>

    );
}

export default Roles;