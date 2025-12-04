import './Login.css';
import {API} from '../../globalConstants.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import axios from 'axios';

function Login() {
    const URL = API + '/authenticate'
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const {login} = useContext(AuthContext);

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    async function authenticate(e) {
        e.preventDefault();
        try {
            const response = await axios.post(URL, data);
            console.log(response);
            login(response.data);
        }
        catch (er) {
            console.error(er.response.data.error);
        }
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
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;