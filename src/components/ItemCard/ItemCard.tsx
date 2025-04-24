import {MarketplaceItemDto} from "./MarketplaceItemDto.ts";
import "./ItemCard.css";
import {useAuth} from "../../Auth/AuthProvider.tsx";
import axios, {AxiosError} from "axios";
import {PostResponse} from "../../Responses/PostResponse.ts";
import {useState} from "react";
import {Bounce, toast, ToastContainer} from 'react-toastify';
import {useBasket} from "../../Contexts/BasketContext.tsx";

interface Props{
    item : MarketplaceItemDto;
}

export function ItemCard({item}: Props) {

    const {user, token} = useAuth()
    const [error, setError] = useState<string | null>(null);
    const {add} = useBasket();
    const notify = () => toast.info(error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });

    const handleAdd = async () => {
        //     const url = "http://localhost:5000/marketpalce-module/Basket/add-item";
        //     try {
        //         if (!user) {
        //             setError(null)
        //             return
        //         }
        //
        //         const response = await axios.post<PostResponse>(url, {marketplaceItemId: item.id}, {
        //             headers: {
        //                 Authorization: `Bearer ${token}`
        //             }
        //         });
        //
        //         if (response.data.isSuccess) {
        //             setError(null)
        //             notify()
        //         } else {
        //             setError(response.data.message ?? 'Error adding item');
        //             notify();
        //         }
        //     } catch (err) {
        //
        //         if (!axios.isCancel(err)) {
        //             setError((err as AxiosError).message);
        //             notify();
        //         }
        //     }
        // }
        await add(item.id)
    }



    return (
        <>
            <div className="item-card">
                <div className="item-image">
                    <img src={item.imageUrl} alt={item.title}/>
                </div>
                <div className="item-details">
                    <h2>{item.title}</h2>
                    <p>{item.author}</p>
                    <p>Price: {item.price} PLN</p>
                    <button className="add-to-cart-button" onClick={handleAdd}>Add to Cart</button>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}
