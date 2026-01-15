import './Users.css';
import {useState} from 'react';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';

function Users() {
    const [updated, setUpdated] = useState(0);
    const [param, setParam] = useState('');
    return (
        <div className={'categoryPage'}>
            <h2>Users</h2>
            <section className="categoryBox">
                <DisplayGrid
                    type="user"
                    updated={updated}
                    param={param}
                />
            </section>
        </div>
    );
}

export default Users;