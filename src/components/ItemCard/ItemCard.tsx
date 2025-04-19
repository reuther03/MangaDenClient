import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import MarketplaceItemsResponse from "./MarketplaceItemsResponse.ts";
import {MarketplaceItemDto} from "./MarketplaceItemDto.ts";

export function ItemCard() {
    const url = 'http://localhost:5000/marketpalce-module/Marketplace/marketplaceItems';

    const [items, setItems] = useState<MarketplaceItemDto[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const response = await axios.get<MarketplaceItemsResponse>(url, {
                    signal: controller.signal
                });
                if (response.data.isSuccess) {
                    setItems(response.data.value.items);
                } else {
                    setErrorMessage(response.data.message);
                }
            } catch (err: unknown) {
                if (err instanceof AxiosError) {
                    console.error('Login error:', err.response?.data || err.message);
                    setErrorMessage(err.response?.data.message || 'An error occurred during login.');
                } else {
                    console.error('Unexpected error:', err);
                    setErrorMessage('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            controller.abort();
        };
    }, []);

    if (loading) return <p>Loading…</p>;
    if (errorMessage)   return <p style={{color:'red'}}>Error: {errorMessage}</p>;

    return (
        <>
            <ul>
                {items.map(u => (
                    <li key={u.id}>{u.author}</li>
                ))}
            </ul>
        </>
    );
}
