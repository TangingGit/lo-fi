import { CardHistoryInfo } from "./CardHistoryInfo"
import { CommonResponse } from "./CommonResponse"

export interface GetCardHistoryByIdResponse extends CommonResponse<Array<CardHistoryInfo>> {
    data: CardHistoryInfo [] | null
}
