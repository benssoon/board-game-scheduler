import './Login.css';
import {API} from '../../globalConstants.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';
import {Navigate} from 'react-router-dom';

function Login() {
    const URL = API + '/authenticate'
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const {login, logout, isAuth} = useContext(AuthContext);

    async function authenticate(e) {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post(URL, data);
            console.log(response);
            login(response.data.jwt);
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
        </>
    );
}

export default Login;