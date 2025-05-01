import './TopHeader.css';
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "../../Auth/AuthProvider.tsx";
import {useBasket} from "../../Contexts/BasketContext.tsx";

function TopHeader() {

    const {user, logout, token} = useAuth();
    const {count, refresh} = useBasket()

    useEffect(() => {
        if (token) refresh();
    }, [token, refresh]);

    return (
        <>
            <nav>
                <div id="top-header">
                    <ul>
                        <li><Link to="/">Contact</Link></li>
                    </ul>
                    <ul>
                        <li className="input-bar">
                            <input type="text" placeholder="Search..."/>
                            <button>
                                Search
                            </button>
                        </li>
                    </ul>
                    <ul className="account">
                        {user ? (
                            <>
                                <span>{user.name}</span>
                                <button onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                        <li>
                            <Link className={"basket"} to="/basket">Basket ({count ?? 0})</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default TopHeader;
