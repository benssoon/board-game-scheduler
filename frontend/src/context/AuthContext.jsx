import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import useFetch from '../helpers/useFetch.js';
import {API} from '../globalConstants.js';
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (Date.now()/1000 < decoded.exp ? true : false) {
                fetchUserData(decoded.sub, token);
            } else {
                logout();
            }
        } else {
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
            console.log(result.data);
            setAuth({
                isAuth: true,
                // TODO What is the point of user? Where is it ever used?
                user: {
                    username: result.data.username,
                    email: result.data.email,
                },
                status: 'done',
            });
        }
        catch (er) {
            console.error(er);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }

    }

    function login(token) {
        localStorage.setItem('token', token);
        const username = jwtDecode(token).sub;
        fetchUserData(username, token);
        console.log(auth.user.username + ' is logged in!');
        navigate("/profile");
    }

    function logout() {
        localStorage.removeItem('token');
        console.log(auth.user.username + ' is logged out.');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate("/");
    }

    const authorization = {
        isAuth: auth['isAuth'],
        user: auth['user'],
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