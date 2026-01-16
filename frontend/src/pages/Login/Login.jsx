import './Login.css';
import {API} from '../../globalConstants.js';
import {useContext, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import axios from 'axios';
import {handleFormChange} from '../../helpers/handlers.js';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import FormField from '../../components/FormField/FormField.jsx';

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

            <form className={'login-form'} onSubmit={authenticate}>
                <FormField
                    type={'username'}
                    label={'Username'}
                    id={'username'}
                    name={'username'}
                    value={data.username}
                    formState={data}
                    handleChange={(e) => handleFormChange(e, data, setData)}
                />
                <FormField
                    type="password"
                    label={'Password'}
                    id="password"
                    name="password"
                    value={data.password}
                    formState={data}
                    handleChange={(e) => handleFormChange(e, data, setData)}
                />
                <button type="submit">Login</button>
            </form>
            <Link to={"/register"}>Register</Link>
        </>
    );
}

export default Login;