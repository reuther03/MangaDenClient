import {BasketItemsDto} from "./BasketItemsDto.ts";
import "./BasketItemCard.css";


export function BasketItemCard(item: BasketItemsDto) {

    const handleDelete = async () => {
        // Implement the delete functionality here
        console.log(`Deleting item with ID: ${item.id}`);
    };

    return (
        <>
            <div className="basket-block">
                <div className="basket-image">
                    <img src={item.marketplaceItem.imageUrl} alt={item.marketplaceItem.title}/>
                </div>
                <div className="basket-details">
                    <h2>{item.marketplaceItem.title}</h2>
                    <p>Price: {item.marketplaceItem.price} PLN</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={handleDelete} className="btn">Delete</button>
                </div>
            </div>
        </>
    );
}
