import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {API} from '../globalConstants.js';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        isAdmin: false,
        isUser: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        console.log('mounting authcontext') // TODO keep this until the errors with expired tokens are resolved
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded)
            if (Date.now() / 1000 < decoded.exp) {
                fetchUserData(decoded.sub, token);
            } else {
                console.log('Token expired.');
                logout();
            }
        } else {
            console.log('No token present.');
            setAuth({
                ...auth,
                status: 'done',
            });
        }
    }, []);

    async function fetchUserData(username, token) {
        try {
            const result = await axios.get(`${API}/users/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const u = result.data
            setAuth({
                isAuth: true,
                /* Check if 'ROLE_ADMIN' is in roles. */
                isAdmin: u.roles.some((role) => {
                    return role.role === 'ROLE_ADMIN'
                }),
                /* Check if 'ROLE_USER' is in roles. */
                isUser: u.roles.some((role) => {
                    return role.role === 'ROLE_USER'
                }),
                user: {
                    username: u.username,
                    email: u.email,
                    name: u.name,
                    address: u.address,
                    telephoneNumber: u.telephoneNumber,
                    age: u.age,
                    area: u.area,
                    hostedEvents: u.hostedEvents,
                    joinedEvents: u.joinedEvents,
                    roles: u.roles,
                },
                status: 'done',
            });
        }
        catch (er) {
            console.error(er);
            logout();
        }

    }

    function login(token) {
        localStorage.setItem('token', token);
        const username = jwtDecode(token).sub;
        fetchUserData(username, token);
        console.log(auth.isAdmin)
        console.log(username + ' is logged in!');
        navigate("/profile");
    }

    function logout() {
        console.log(jwtDecode(localStorage.getItem('token')).sub + ' is logged out.');
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate("/");
    }

    const authorization = {
        isAuth: auth.isAuth,
        isUser: auth.isUser,
        isAdmin: auth.isAdmin,
        user: auth.user,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={authorization}>
            {auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;