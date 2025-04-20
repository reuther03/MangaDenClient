import {MarketplaceItemDto} from "./MarketplaceItemDto.ts";
import "./ItemCard.css";

interface Props{
    item : MarketplaceItemDto;
}

export function ItemCard({item}: Props) {


    return (
        <>
            <div className="item-card">
                <div className="img">
                    <img src={item.imageUrl} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <p>{item.price} PLN</p>
                <p>{item.marketplacePointsCost} MP</p>
            </div>
        </>
    );
}
