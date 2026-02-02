import './Users.css';
import DisplayGrid from '../../components/DisplayGrid/DisplayGrid.jsx';

function Users() {
    return (
        <div className={'categoryPage'}>
            <h2>Users</h2>
            <section className="categoryBox">
                <DisplayGrid
                    type="user"
                />
            </section>
        </div>
    );
}

export default Users;