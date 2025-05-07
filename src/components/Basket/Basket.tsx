import "./Basket.css";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {BasketDto} from "./BasketDto.ts";
import {useAuth} from "../../Auth/AuthProvider.tsx";
import {ApiResponse} from "../../Responses/ApiResponse.ts";
import {BasketItemCard} from "./BasketItemCard.tsx";

export function Basket() {
    const url = 'http://localhost:5000/marketpalce-module/Basket';

    const {token} = useAuth();

    const [basket, setBasketItem] = useState<BasketDto>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get<ApiResponse<BasketDto>>(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    signal: controller.signal
                });
                console.log(response.data);

                if (response.data.isSuccess) {
                    setBasketItem(response.data.value);
                } else {
                    setErrorMessage(response.data.message);
                }
            } catch (err: unknown) {
                if (axios.isCancel(err)) return;
                const axErr = err as AxiosError<{ message?: string }>;
                setErrorMessage(axErr.response?.data.message ?? 'Unable to load items.');
            } finally {
                setLoading(false);
            }
        })();
    }, [token]);

    return (
        <>
            <div id="basket">
                {loading && <div className="loading">Loading...</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="basket-header">
                    <h1>Your Basket</h1>
                </div>
                {basket?.basketItems.map(i => (
                    <BasketItemCard key={i.id} id={i.id} marketplaceItem={i.marketplaceItem} quantity={i.quantity}/>
                ))}
            </div>
        </>
    );
}
