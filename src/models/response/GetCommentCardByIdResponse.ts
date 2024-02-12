import { CommentInfo } from "./CommentInfo"
import { CommonResponse } from "./CommonResponse"

export interface GetCommentCardByIdResponse extends CommonResponse<Array<CommentInfo>> {
    data: CommentInfo [] | null
}
