import './TopHeader.css';
import {Link} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {BasketResponse} from "./Responses/BasketResponse.ts";
import {useEffect, useState} from "react";

export function useBasketCount() {
    const [count, setCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const basketUrl =
        'http://localhost:5000/marketpalce-module/Basket';

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const {data} = await axios.get<BasketResponse>(basketUrl, {
                    signal: controller.signal,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (data.isSuccess) {
                    setCount(data.value.basketItems.reduce((sum, item) => sum + item.quantity, 0));
                } else {
                    setError(data.message);
                }
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError((err as AxiosError).message);
                }
            }
        })();

        return () => controller.abort();
    }, []);

    return {count, error};
}


function TopHeader() {

    const {count, error} = useBasketCount();
    const user = () => {
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
