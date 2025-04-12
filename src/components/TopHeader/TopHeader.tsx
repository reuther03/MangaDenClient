import './TopHeader.css';
import {Link} from "react-router-dom";


function TopHeader() {
    return (
        <>
            <div className="main">
                <div className="top-header">
                    <div className="logo">
                        <img src="/logoxd.png" alt="Logo" className="logo"/>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                        <button type="submit">
                            <img src="/search.png" alt=""/>
                        </button>
                    </div>
                    <div className="login">
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopHeader;
