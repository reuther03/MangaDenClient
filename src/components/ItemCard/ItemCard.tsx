import {MarketplaceItemDto} from "./MarketplaceItemDto.ts";
import "./ItemCard.css";

interface Props{
    item : MarketplaceItemDto;
}

export function ItemCard({item}: Props) {


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
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        </>
    );
}
