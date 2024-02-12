import { CardInfo } from "./CardInfo"
import { CommonResponse } from "./CommonResponse"

export interface GetCardResponse extends CommonResponse<Array<CardInfo>> {
    data: CardInfo [] | null
}
