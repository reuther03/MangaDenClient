import "./Basket.css";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {BasketResponse} from "./BasketResponse.ts";
import {BasketDto} from "./BasketDto.ts";
import {ItemCard} from "../ItemCard/ItemCard.tsx";

export function Basket() {
    const url = 'http://localhost:5000/marketpalce-module/Basket';

    const [basket, setBasketItem] = useState<BasketDto>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get<BasketResponse>(url, {
                    signal: controller.signal
                });
                if (response.data.ResponseStatus.isSuccess) {
                    setBasketItem(response.data.value.basket);
                } else {
                    setErrorMessage(response.data.ResponseStatus.message);
                }
            } catch (err: unknown) {
                if (axios.isCancel(err)) return;
                const axErr = err as AxiosError<{ message?: string }>;
                setErrorMessage(axErr.response?.data.message ?? 'Unable to load items.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <div id="basket-main">
                {basket?.BasketItems.map(i => (
                    <ItemCard key={i.id} item={i.MarketplaceItem}/>
                ))}
            </div>
        </>
    );
}
