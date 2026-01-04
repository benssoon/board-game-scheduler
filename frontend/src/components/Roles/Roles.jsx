import './Roles.css';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {API} from '../../globalConstants.js';

function Roles() {
    const [roles, setRoles] = useState(null);

    const token = localStorage.getItem('token');
    const username = jwtDecode(token).sub;
    const {isAdmin} = useContext(AuthContext);

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

    return (
        <>
        {isAdmin && <button type={'button'} onClick={getUserRoles}>Get Roles</button>}
                    {roles && <ul>{
                        roles.map((role) => {
                            return <li key={role.role}>{role.role}</li>
                        })
                    }</ul>}
        </>

    );
}

export default Roles;