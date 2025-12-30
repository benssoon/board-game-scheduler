import './ChangePassword.css';
import UserForm from '../../components/UserForm/UserForm.jsx';

function ChangePassword() {
    return (
        <>
            <UserForm
                type={'edit'}
                fields={['password']}
            />
        </>
    );
}

export default ChangePassword;