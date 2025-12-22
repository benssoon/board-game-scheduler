import './Login.css';
import {API} from '../../globalConstants.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';

function Login() {
    const URL = API + '/authenticate'
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const {login, isAuth} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    async function authenticate(e) {
        e.preventDefault();
        try {
            const response = await axios.post(URL, data);
            login(response.data.jwt);
            if (location.state) {
                navigate(location.state.from.pathname)
            }
        }
        catch (er) {
            console.error(er);
            console.error(er.response);
        }
    }

    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <>
            <h2>Login</h2>

            <form onSubmit={authenticate}>
                <label htmlFor="username">Username</label>
                <input
                    type="username"
                    id="username"
                    name="username"
                    value={data.username}
                    onChange={(e) => handleFormChange(e, data, setData)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => handleFormChange(e, data, setData)}
                />
                <button type="submit">Login</button>
            </form>
            <Link to={"/register"}>Register</Link>
        </>
    );
}

export default Login;