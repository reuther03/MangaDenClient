import './TopHeader.css';
import {Link} from "react-router-dom";


function TopHeader() {
    return (
        <>
            <nav>
                <div id="top-header">
                    <ul>
                        <li><Link to="/">Contect us</Link></li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        {/*<li><Link to="/register">Zarejestruj się</Link></li>*/}
                        <li>
                            <Link className={"basket"} to="/basket">Basket</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default TopHeader;
