import {BasketItemsDto} from "./BasketItemsDto.ts";

export interface BasketDto {
    basketItems: BasketItemsDto[];
    totalPrice: number;
    totalPoints: number;
}
