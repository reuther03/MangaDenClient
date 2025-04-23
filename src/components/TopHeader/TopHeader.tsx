import './TopHeader.css';
import {Link} from "react-router-dom";


function TopHeader() {
    const user =  () => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1]));
            return (
                <div className="user-info">
                    <span >{user.name}</span>
                </div>
            );
        }
        return <Link to="/login">Login</Link>;
    }

    return (
        <>
            <nav>
                <div id="top-header">
                    <ul>
                        <li><Link to="/">Contect us</Link></li>
                    </ul>
                    <ul>
                        <li>
                            {user()}
                        </li>
                        <li>
                            <Link className={"basket"} to="/basket">Basket ({})</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default TopHeader;
