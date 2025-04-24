import {createContext, useCallback, useContext, useState} from 'react';
import axios from 'axios';
import {useAuth} from "../Auth/AuthProvider.tsx";
import {BasketResponse} from "../components/TopHeader/Responses/BasketResponse.ts";

interface BasketContextValue {
    count: number;
    refresh: () => Promise<void>;
    add: (marketplaceItemId: string) => Promise<void>;
}

const BasketContext = createContext<BasketContextValue | undefined>(undefined);

export function BasketProvider({children}: { children: React.ReactNode }) {
    const [count, setCount] = useState(0);
    const token = useAuth().token;
    const baseURL = 'http://localhost:5000/marketpalce-module/Basket';

    const refresh = useCallback(async () => {
        if (!token) return setCount(0);

        const {data} = await axios.get<BasketResponse>(`${baseURL}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        if (data.isSuccess) setCount(data.value.basketItems.reduce((sum, i) => sum + i.quantity, 0))
        else setCount(0);
    }, [token]);

    const add = useCallback(
        async (marketplaceItemId: string) => {
            if (!token) throw new Error('User not authenticated');

            await axios.post(
                `${baseURL}/add-item`,
                {marketplaceItemId},
                {headers: {Authorization: `Bearer ${token}`}}
            );

            await refresh();
            setCount((c) => c);
        },
        [token, refresh]
    );

    return (
        <BasketContext.Provider value={{count, refresh, add}}>
            {children}
        </BasketContext.Provider>
    );
}

export function useBasket() {
    const ctx = useContext(BasketContext);
    if (!ctx) throw new Error('useBasket must be used inside <BasketProvider>');
    return ctx;
}
