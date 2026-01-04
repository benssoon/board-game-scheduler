import './Roles.css';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {API} from '../../globalConstants.js';

function Roles({username}) {
    const [roles, setRoles] = useState(null);
    const [updated, setUpdated] = useState(0);

    const token = localStorage.getItem('token');
    const {isAdmin} = useContext(AuthContext);

    useEffect(() => {
        if (updated) {
            getUserRoles();
        }
    }, [updated]);

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
            //setRoles \/
            console.log(roles.map((mappedRole) => {
                if (mappedRole !== role) {
                    return mappedRole;
                }
            }));
            console.log(response);
            setUpdated(prev => prev + 1);
        } catch (er) {
            const response = er.response;
            console.log(response);
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
        </>

    );
}

export default Roles;