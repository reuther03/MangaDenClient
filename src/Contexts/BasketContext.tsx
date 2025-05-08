import {createContext, useCallback, useContext, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useAuth} from "../Auth/AuthProvider.tsx";
import {BasketResponse} from "../components/TopHeader/Responses/BasketResponse.ts";
import {toast} from "react-toastify";
import {PostResponse} from "../Responses/PostResponse.ts";

interface BasketContextValue {
    count: number;
    refresh: () => Promise<void>;
    add: (marketplaceItemId: string) => Promise<void>;
    remove: (marketplaceItemId: string) => Promise<void>;
    updateQuantity: (marketplaceItemId: string, quantity: number) => Promise<void>;
}

const BasketContext = createContext<BasketContextValue | undefined>(undefined);


export function BasketProvider({children}: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    const {token} = useAuth()
    const baseURL = 'http://localhost:5000/marketpalce-module/Basket';


    const refresh = useCallback(async () => {

        if (!token) {
            setCount(0)
            return;
        }

        try {
            const {data} = await axios.get<BasketResponse>(
                `${baseURL}`,
                {headers: {Authorization: `Bearer ${token}`}}
            );

            setCount(
                data.value.basketItems.reduce((sum, i) => sum + i.quantity, 0)
            );

        } catch (err) {
            console.error(err);
            setCount(0);
        }
    }, [token]);

    const add = async (marketplaceItemId: string) => {
        try {
            const res = await axios.post<PostResponse>(
                `${baseURL}/add-item`,
                {marketplaceItemId},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            if (res.data.isSuccess) {
                await refresh();
                toast.success("✓ Added to basket");
            } else {

                toast.error(res.data.message || "Something went wrong");
            }
        } catch (err) {

            const axErr = err as AxiosError<PostResponse>;
            const apiMsg = axErr.response?.data?.message;

            toast.error(apiMsg ?? axErr.message ?? "Network error");
        }
    };

    const remove = async (marketplaceItemId: string) => {
        try {
            const res = await axios.delete<PostResponse>(baseURL, {
                headers: {Authorization: `Bearer ${token}`},
                data: {itemId: marketplaceItemId}
            });
            if (res.data.isSuccess) {
                await refresh();
                toast.success("✓ Removed from basket");
            } else {

                toast.error(res.data.message || "Something went wrong");
            }
        } catch (err) {
            const axErr = err as AxiosError<PostResponse>;
            const apiMsg = axErr.response?.data?.message;

            toast.error(apiMsg ?? axErr.message ?? "Network error");
        }
    };

    const updateQuantity = async (marketplaceItemId: string, quantity: number) => {
        try {
            const res = await axios.patch<PostResponse>(`http://localhost:5000/marketpalce-module/Basket/update-item-quantity`,
                {itemId: marketplaceItemId, quantity: quantity},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            if (res.data.isSuccess) {
                await refresh();
            } else {
                toast.error(res.data.message || "Something went wrong");
            }
        } catch (err) {
            const axErr = err as AxiosError<PostResponse>;
            const apiMsg = axErr.response?.data?.message;

            toast.error(apiMsg ?? axErr.message ?? "Network error");
        }
    }

    return (
        <BasketContext.Provider value={{count, refresh, add, remove, updateQuantity}}>
            {children}
        </BasketContext.Provider>
    );
}

export function useBasket() {
    const ctx = useContext(BasketContext);
    if (!ctx) throw new Error('useBasket must be used inside <BasketProvider>');
    return ctx;
}
