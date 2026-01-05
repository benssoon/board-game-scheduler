import './Notification.css';
import {useEffect, useState} from 'react';

function Notification({children, setParent, isError}) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
        setTimeout(() => {
            setActive(false);
            setParent(null);
        }, 8000);

    }, []);

    return (
        active && <div className={`notification${isError ? ' notification-error' : ' notification-success'}`}>
            {children}
        </div>
    );
}

export default Notification;