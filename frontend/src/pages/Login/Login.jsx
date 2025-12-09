import './Login.css';
import {API} from '../../globalConstants.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';

function Login() {
    const URL = API + '/authenticate'
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const {login} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);

    async function authenticate(e) {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post(URL, data);
            console.log(response);
            login(response.data.jwt);
            console.log('tried');
        }
        catch (er) {
            console.error(er);
            console.error(er.response);
            console.error('erred')
        }
        console.log('got through.')
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

            <h2>Logout</h2>

            <button type="submit" onClick={() => logout()}>Logout</button>
        </>
    );
}

export default Login;