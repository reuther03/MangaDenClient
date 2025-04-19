import {MarketplaceItemDto} from "./MarketplaceItemDto.ts";

interface MarketplaceItemsResponse {
    value: {
        items: MarketplaceItemDto[];
    },
    isSuccess: boolean;
    status: number;
    message: string;
}

export default MarketplaceItemsResponse;
