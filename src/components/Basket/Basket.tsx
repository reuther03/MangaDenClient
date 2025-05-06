import "./Basket.css";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {BasketDto} from "./BasketDto.ts";
import {useAuth} from "../../Auth/AuthProvider.tsx";
import {ApiResponse} from "../../Responses/ApiResponse.ts";
import {ItemCard} from "../ItemCard/ItemCard.tsx";

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
            <div id="basket-main">
                {loading && <div className="loading">Loading...</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
                {/*{basket?.BasketItems.map(i => (*/}
                {/*    <ItemCard key={i.id} item={i.MarketplaceItem}/>*/}
                {/*))}*/}
                {/*<div>{basket?.BasketItems.map(x => x.MarketplaceItem.price)}</div>*/}
                {basket?.basketItems.map(i => (
                    <ItemCard key={i.id} item={i.marketplaceItem}/>
                ))}
            </div>
        </>
    );
}
