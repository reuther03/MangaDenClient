import {BasketItemDto} from "./BasketItemDto.ts";

export interface BasketDto {
    BasketItems: BasketItemDto[];
    totalPrice: number;
    totalPoints: number;
}
