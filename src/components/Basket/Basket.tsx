import "./Basket.css";
import {useCallback, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {BasketDto} from "./BasketDto.ts";
import {useAuth} from "../../Auth/AuthProvider.tsx";
import {ApiResponse} from "../../Responses/ApiResponse.ts";
import {BasketItemCard} from "./BasketItemCard.tsx";
import {useBasket} from "../../Contexts/BasketContext.tsx";

export function Basket() {
    const url = 'http://localhost:5000/marketpalce-module/Basket';

    const {token} = useAuth();
    const {remove, updateQuantity} = useBasket()

    const [basket, setBasket] = useState<BasketDto>();
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

                if (response.data.isSuccess) {
                    setBasket(response.data.value);
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

    const loadItems = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await axios.get<ApiResponse<BasketDto>>(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setBasket(response.data.value);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const handleRemove = async (id: string) => {
        await remove(id);
        await loadItems();
    };

    const handleIncrement = async (id: string) => {
        await updateQuantity(id, 1);
        await loadItems();
    }

    const handleDecrement = async (id: string) => {
        await updateQuantity(id, -1);
        await loadItems();
    }

    return (
        <>
            <div id="basket">
                {loading && <div className="loading">Loading...</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
                <div className="basket-header">
                    <h1>Your Basket</h1>
                </div>
                {basket?.basketItems.length === 0 && <div className="empty-basket">Your basket is empty.</div>}
                {basket?.basketItems.map(i => (
                    <BasketItemCard key={i.id} item={i}
                                    remove={handleRemove}
                                    incrementQuantity={handleIncrement}
                                    decrementQuantity={handleDecrement}/>
                ))}
            </div>
        </>
    );
}
