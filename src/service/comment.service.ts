import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { DeleteResult } from 'typeorm';
import { AuthService } from './auth.service';
import { CommonResponse } from 'src/models/response/CommonResponse';
import Status from 'src/constant/Status';
@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly authService: AuthService
  ) {}

  async updateComment(commentId: number, commentText: string, payload: string): Promise<CommonResponse<null>> {
    const {userId} = await this.authService.decodeJWT(payload)
    await this.commentRepository.updateCommentText(commentId, commentText, userId)
    return this.successResponse()
  }

  async deleteComment(commentId: number, payload: string): Promise<CommonResponse<null>> {
    const {userId} = await this.authService.decodeJWT(payload)
    await this.commentRepository.remove(commentId,userId)

    return this.successResponse()
  }

  successResponse(){
    let response: CommonResponse<null> = {
      status: {
        code: Status.SUCCESS
      },
      data: null
    }

    return response
  }
}
