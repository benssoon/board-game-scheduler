import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

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
            console.log(decoded);
            setAuth({
                isAuth: true,
                user: {
                    username: decoded.username,
                    email: decoded.email,
                    roles: decoded.roles,
                },
                status: 'done',
            });
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    const data = {
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
        <AuthContext.Provider value={data}>
            {auth.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;