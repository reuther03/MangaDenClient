import {BasketDto} from "./BasketDto.ts";
import {ResponseStatus} from "../../Responses/ResponseStatus.ts";

export interface BasketResponse {
    value: {
        basket: BasketDto;
    },
    ResponseStatus: ResponseStatus
}
