import {ItemCard} from "../ItemCard/ItemCard.tsx";
import {useEffect, useState} from "react";
import {MarketplaceItemDto} from "../ItemCard/MarketplaceItemDto.ts";
import axios, {AxiosError} from "axios";
import MarketplaceItemsResponse from "../ItemCard/MarketplaceItemsResponse.ts";
import {useSearchParams} from "react-router-dom";

export function ItemSearch() {
    const url = 'http://localhost:5000/marketpalce-module/Marketplace/marketplace-items/search';

    const [params] = useSearchParams();
    const [items, setItems] = useState<MarketplaceItemDto[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setLoading(true);

            const term = params.get('term');

            try {
                const response = await axios.get<MarketplaceItemsResponse>(url, {
                    params: {
                        SearchTerm: term,
                    },
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
        }

        load();
        return () => controller.abort();
    }, [params]);

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
