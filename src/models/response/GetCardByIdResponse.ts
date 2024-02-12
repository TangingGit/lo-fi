import { CardInfo } from "./CardInfo"
import { CommonResponse } from "./CommonResponse"

export interface GetCardByIdResponse extends CommonResponse<CardInfo> {
    data: CardInfo | null
}
