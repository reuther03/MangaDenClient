import axios, {AxiosError} from "axios";
import MarketplaceItemsResponse from "../ItemCard/MarketplaceItemsResponse.ts";
import {useEffect, useState} from "react";
import {MarketplaceItemDto} from "../ItemCard/MarketplaceItemDto.ts";
import {ItemCard} from "../ItemCard/ItemCard.tsx";
import "./Home.css";

export function Home() {
    const url = 'http://localhost:5000/marketpalce-module/Marketplace/marketplace-items';

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
                if (axios.isCancel(err)) return;
                const axErr = err as AxiosError<{ message?: string }>;
                setErrorMessage(axErr.response?.data?.message ?? 'Unable to load items.');
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
            {errorMessage && (
                <p>{errorMessage}</p>
            )}

            <div className="items-grid">
                {items.map(i => (
                    <ItemCard key={i.id} item={i} />
                ))}
            </div>
        </>
    );
}
