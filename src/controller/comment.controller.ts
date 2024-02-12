import { Body, Controller, Delete, Get, Param, Put, UseGuards, UsePipes, ValidationPipe, Headers} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { AuthGuard } from 'src/guard/authguard';
import { UpdateCommentRequest } from 'src/models/request/UpdateCommentRequest';
import { CommonResponse } from 'src/models/response/CommonResponse';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller("api/v1/comment")
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Put(":comment_id/id")
  async updateComment(
    @Param('comment_id') commentId: number,
    @Body() updateCommentRequest: UpdateCommentRequest,
    @Headers('Authorization') payload: string
    
  ): Promise<CommonResponse<null>> {
    return await this.commentService.updateComment(commentId, updateCommentRequest.comment_text, payload);
  }

  @Delete(":comment_id/id")
  async deleteComment(
    @Param('comment_id') commentId: number,
    @Headers('Authorization') payload: string
  ): Promise<CommonResponse<null>> {
    return await this.commentService.deleteComment(commentId,payload);
  }
}

