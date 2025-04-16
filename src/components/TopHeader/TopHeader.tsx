import './TopHeader.css';
import {Link} from "react-router-dom";


function TopHeader() {
    return (
        <>
            <header>
                <div className="top-header">
                    <ul>
                        <li><Link to="/">Contect us</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        {/*<li><Link to="/register">Zarejestruj się</Link></li>*/}
                        <div>
                            <li><Link to="/Basket">Basket</Link></li>
                        </div>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default TopHeader;
