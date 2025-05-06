import {MarketplaceItemDto} from "../ItemCard/MarketplaceItemDto.ts";

export interface BasketItemsDto {
    id: string;
    marketplaceItem: MarketplaceItemDto;
    quantity: number;
}
