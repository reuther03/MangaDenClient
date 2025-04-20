import axios, {AxiosError} from "axios";
import MarketplaceItemsResponse from "../ItemCard/MarketplaceItemsResponse.ts";
import {useEffect, useState} from "react";
import {MarketplaceItemDto} from "../ItemCard/MarketplaceItemDto.ts";
import {ItemCard} from "../ItemCard/ItemCard.tsx";
import "./Home.css";

export function Home() {
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
    if (items.length === 0) return <p>No items available.</p>;

    return (
        <>
            <div className="item-grid">
                {items.map(i => (
                    <ItemCard key={i.id} item={i} />
                ))}
            </div>
        </>
    );
}
