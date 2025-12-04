import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import useFetch from '../useFetch.js';
import {API} from '../globalConstants.js';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const {data} = useFetch(`/users/${jwtDecode(localStorage.getItem('token')).sub}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && data) {
            setAuth({
                isAuth: true,
                user: {
                    username: data.username,
                    email: data.email,
                },
                status: 'done',
            });
        }
        if (!token) {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [data]);

    const authorization = {
        isAuth: auth['isAuth'],
        user: auth['user'],
        login: login,
        logout: logout,
    }

    function login(response) {
        localStorage.setItem('token', response.jwt);
        setAuth({
            ...auth,
            isAuth: true,
            user: response.user,
        });
        console.log(response.user.username + ' is logged in!');
        navigate("/profile");
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log(auth.user.username + ' is logged out.');
        navigate("/");
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