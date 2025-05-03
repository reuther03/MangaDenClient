import {MarketplaceItemDto} from "../ItemCard/MarketplaceItemDto.ts";

export interface BasketItemDto {
    id: string;
    MarketplaceItem: MarketplaceItemDto;
    quantity: number;
}
