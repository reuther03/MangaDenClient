import './TopHeader.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../Auth/AuthProvider.tsx";
import {useBasket} from "../../Contexts/BasketContext.tsx";

function TopHeader() {

    const {user, logout, token} = useAuth();
    const {count, refresh} = useBasket()
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) refresh();
    }, [token, refresh]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const term = searchTerm.trim();
        if (!term) return;

        navigate(`/manga?term=${encodeURIComponent(term.charAt(0).toUpperCase() + term.slice(1))}`);
    }

    return (
        <>
            <nav>
                <div id="top-header">
                    <ul>
                        <li><Link to="/">Contact</Link></li>
                    </ul>
                    <ul>
                        <li className="input-bar">
                            <form onSubmit={handleSubmit} className="input-bar">
                                <label htmlFor="search-input"/>
                                <input
                                    id="search-input"
                                    type="text"
                                    value={searchTerm}
                                    placeholder="Search…"
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                <button type="submit">Search</button>
                            </form>
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
