import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {API} from '../globalConstants.js';
import axios from 'axios';
import {tokenIsValid} from '../helpers/tokenIsValid.js';

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
    const token = localStorage.getItem('token');

    useEffect(() => {
        console.log('mounting authcontext') // TODO keep this until the errors with expired tokens are resolved
        if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded)
            if (tokenIsValid(decoded)) {
                fetchUserData(decoded.sub, token);
            } else {
                logout();
            }
        } else {
            console.log('No token present.');
            setAuth({
                ...auth,
                status: 'done',
            });
        }
    }, [token]);

    async function fetchUserData(username, token) {
        try {
            const result = await axios.get(`${API}/users/${username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result)
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
                    profilePicture: `${API}/images/profilePicture.png?username=${username}`,
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
        console.log(username + ' is logged in!');
        navigate("/profile");
    }

    function logout() {
        console.log(`${auth.user.username} is logged out.`);
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