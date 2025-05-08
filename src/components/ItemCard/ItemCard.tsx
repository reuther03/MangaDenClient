import {MarketplaceItemDto} from "./MarketplaceItemDto.ts";
import "./ItemCard.css";
import {Bounce, ToastContainer} from 'react-toastify';
import {useBasket} from "../../Contexts/BasketContext.tsx";
import {Link} from "react-router-dom";

interface Props{
    item : MarketplaceItemDto;
}

export function ItemCard({item}: Props) {
    const {add} = useBasket();

    const handleAdd = async () => {
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
                    <p><Link to={`/manga/author/${encodeURIComponent(item.author)}`}>{item.author}</Link></p>
                    <p>Price: {item.price} PLN</p>
                    <button type="button" className="btn" onClick={handleAdd}>Add to Cart</button>
                </div>
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
        </>
    );
}
