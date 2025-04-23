import './TopHeader.css';
import {Link} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {BasketResponse} from "./Responses/BasketResponse.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../../Auth/AuthProvider.tsx";

export function useBasketCount() {

}


function TopHeader() {

    const {user, logout} = useAuth();
    console.log(user)

    const [count, setCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const basketUrl =
        'http://localhost:5000/marketpalce-module/Basket';

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                if (!user){
                    setCount(0);
                    setError(null);
                    return;
                }
                const {data} = await axios.get<BasketResponse>(basketUrl, {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (data.isSuccess) {
                    setCount(data.value.basketItems.reduce((sum, item) => sum + item.quantity, 0));
                    setError(null)
                } else {
                    setError(data.message ?? 'Unable to load basket');
                }
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError((err as AxiosError).message);
                }
            }
        })();

        return () => controller.abort();
    }, [user]);

    return (
        <>
            <nav>
                <div id="top-header">
                    <ul>
                        <li><Link to="/">Contect us</Link></li>
                    </ul>
                    <ul>
                        {user ? (
                            <>
                                <span>Hello {user.name}</span>
                                <button onClick={logout}>Logout</button>
                            </>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                        <li>
                            <Link className={"basket"} to="/basket">Basket ({count})</Link>
                            {error && <p style={{color: 'red'}}>Error: {error}</p>}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default TopHeader;
