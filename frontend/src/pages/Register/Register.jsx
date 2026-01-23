import './Register.css';
import UserForm from '../../components/UserForm/UserForm.jsx';

function Register() {
    return (
        <>
            <h2>Register</h2>
            <UserForm
                type={'create'}
            />
        </>
    );
}

export default Register;