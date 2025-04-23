import {BasketItemDto} from "./BasketItemDto.ts";

export interface BasketResponse {
    value: {
        basketItems: BasketItemDto[];
        totalPrice: number;
        totalItems: number;
    };
    isSuccess: boolean;
    status: number;
    message: string;
}
