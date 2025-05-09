﻿import {BasketItemsDto} from "./BasketItemsDto.ts";
import "./BasketItemCard.css";
import {Bounce, ToastContainer} from "react-toastify";

export interface Props {
    item: BasketItemsDto;
    remove: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
}


export function BasketItemCard(props: Props) {

    const handleDelete = () => {
        props.remove(props.item.id);
    };

    const handleIncrementQuantity = () => {
        props.incrementQuantity(props.item.id);
    }

    const handleDecrementQuantity = () => {
        props.decrementQuantity(props.item.id);
    };

    return (
        <>
            <div className="basket-block">
                <div className="basket-image">
                    <img src={props.item.marketplaceItem.imageUrl} alt={props.item.marketplaceItem.title}/>
                </div>
                <div className="basket-details">
                    <h2>{props.item.marketplaceItem.title}</h2>
                    <p>Price: {props.item.marketplaceItem.price} PLN</p>
                    <div className="qty-action">
                        <button type="button" className="btn" onClick={handleDecrementQuantity}>-</button>
                        <p>Quantity: {props.item.quantity}</p>
                        <button type="button" className="btn" onClick={handleIncrementQuantity}>+</button>
                    </div>
                    <button onClick={handleDelete} className="btn btn--red">Remove</button>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </div>
        </>
    );
}
